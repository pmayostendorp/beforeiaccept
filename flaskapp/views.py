from flask import render_template
from flask import request
from flaskapp import app
from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database
import psycopg2
from lib.textprocessors import text_process_policy, text_paragraph_segmenter
from lib.segmenters import url_input_segmenter
import pandas as pd
import numpy as np
import nltk
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.ensemble import AdaBoostClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
import pickle

##Import our pickled models
# Data encryption: MultinomialNB
with open('pickles/data_encryption_NB_segment.pkl', 'rb') as file:
    data_encryption_model = pickle.load(file)

#Data retention: RandomForestClassifier
with open('pickles/data_retention_RF_segment.pkl', 'rb') as file:
    data_retention_model = pickle.load(file)

#Do not track: MultinomialNB
with open('pickles/do_not_track_NB_segment.pkl', 'rb') as file:
    do_not_track_model = pickle.load(file)

#First party collection: MultinomialNB
with open('pickles/first_party_collection_NB_segment.pkl', 'rb') as file:
    first_party_collection_model = pickle.load(file)

#Third party sharing: RandomForestClassifier 
with open('pickles/third_party_sharing_RF_segment.pkl', 'rb') as file:
    third_party_sharing_model = pickle.load(file)

#User access/deletion: RandomForestClassifier
with open('pickles/user_access_RF_segment.pkl', 'rb') as file:
    user_access_model = pickle.load(file)

#Policy changes: MultinomialNB
with open('pickles/policy_change_NB_segment.pkl', 'rb') as file:
    policy_change_model = pickle.load(file)

#All models we'll evaluate
model_dict = {
    'data_encryption':data_encryption_model,
    'data_retention':data_retention_model,
    'do_not_track':do_not_track_model,
    'first_party_collection':first_party_collection_model,
    'third_party_sharing':third_party_sharing_model,
    'user_access':user_access_model,
    'policy_change':policy_change_model}

#Model thresholds used for class determination.
model_thresholds = {
    'data_encryption':0.05,
    'data_retention':0.01,
    'do_not_track':0.01,
    'first_party_collection':0.3,
    'third_party_sharing':0.16,
    'user_access':0.05,
    'policy_change':0.05}

#A helper function to predict classes from models stored in a dict
def predict_all_models(model_dict,segment_list):
    """
    This takes a dict of BeforeIAccept style models as input and provides
    a dict output with result keys corresponding to the input model keys,
    evaluated on a list of input policy segments. Returns the predicted class
    based on the model's native .predict method.
    """
    names = model_dict.keys()
    result = {}
    for name in names:
        result[name] = model_dict[name].predict(segment_list)
    
    return result

#A helper function to predict probabilities from models stored in a dict
def predict_proba_all_models(model_dict,segment_list,thresholds):
    """
    This takes a dict of BeforeIAccept style models as input and provides
    a dict output with result keys corresponding to the input model keys,
    evaluated on a list of input policy segments. Returns the classification
    results as evaluated against thresholds, a dict of thresholds corresponding
    to the models in model_dict.
    """
    names = model_dict.keys()
    result = {}
    for name in names:
        tmp = model_dict[name].predict_proba(segment_list)[:,1]
        tmp[tmp >= thresholds[name]] = 1
        tmp[tmp < thresholds[name]] = 0
        result[name] = tmp
    
    return result

@app.route('/')
@app.route('/index')
@app.route('/input')
def text_input():
    return render_template("input.html")

@app.route('/output')
def text_output():
    #pull policy text from the input field and store it
    policy_text = request.args.get('policy_text')
    segment_list = text_paragraph_segmenter(policy_text)
    segments_processed = [text_process_policy(segment) for segment in segment_list]
    
    #DEBUGGING PURPOSES
    for segment in segments_processed:
        print(segment)
    
    #Store results for each model category as dataframe, then sum up occurrences found.
    tagged_segments = pd.DataFrame(predict_proba_all_models(model_dict,segments_processed,model_thresholds))
    #DEBUGGING PURPOSES
    for col in list(tagged_segments.columns):
        print(tagged_segments[col])
    
    #Now sum up the results so we track occurences.
    results = tagged_segments.sum()
    print(results)
    
    #TO DO
    #Post-process results to achieve good document-level classification.
    result_data_encryption = 'DOES' if results['data_encryption'] >= 1 else "DOESN'T"
    result_data_retention = 'MAY' if results['data_retention'] >=1 else 'MAY NOT'
    result_do_not_track = 'DOES' if results['do_not_track'] >=1 else "DOESN'T"
    result_first_party_collection = 'DOES' if results['first_party_collection'] >=1 else "DOESN'T"
    result_third_party_sharing = 'DOES' if results['third_party_sharing'] >=1 else "DOESN'T"
    result_user_access = 'DOES' if results['user_access'] >=1 else "DOESN'T"
    result_policy_change = 'DOES' if results['policy_change'] >=1 else "DOESN'T"

    return render_template("output.html", policy_text=policy_text, result_data_encryption=result_data_encryption, result_data_retention=result_data_retention, result_do_not_track=result_do_not_track,  result_first_party_collection=result_first_party_collection, result_third_party_sharing=result_third_party_sharing, result_user_access=result_user_access, result_policy_change=result_policy_change)