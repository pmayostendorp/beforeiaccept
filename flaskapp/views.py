from flask import render_template
from flask import request
from flaskapp import app
from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database
import psycopg2
from lib.text_processors import text_process_policy, text_paragraph_segmenter
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
# Data encryption
with open('pickles/data_encryption_NB_segment.pkl', 'rb') as file:
    data_encryption_model = pickle.load(file)

#Data retention
with open('pickles/data_retention_RF_segment.pkl', 'rb') as file:
    data_retention_model = pickle.load(file)

#Do not track
with open('pickles/do_not_track_NB_segment.pkl', 'rb') as file:
    do_not_track_model = pickle.load(file)

#First party collection
with open('pickles/first_party_collection_NB_segment.pkl', 'rb') as file:
    first_party_collection_model = pickle.load(file)

#Third party sharing
with open('pickles/third_party_sharing_RF_segment.pkl', 'rb') as file:
    third_party_sharing_model = pickle.load(file)

#User access/deletion
with open('pickles/user_access_NB_segment.pkl', 'rb') as file:
    user_access_model = pickle.load(file)

#Policy changes
with open('pickles/policy_change_NB_segment.pkl', 'rb') as file:
    policy_change_model = pickle.load(file)

#TODO: LOAD MODEL THRESHOLDS HERE.
    
#A helper function to predict classes from models stored in a dict
def predict_all_models(model_dict,segment_list):
    """
    This takes a dict of BeforeIAccept style models as input and provides
    a dict output with result keys corresponding to the input model keys,
    evaluated on a list of input policy segments. Returns the predicted class
    based on the model's default threshold.
    """
    names = model_dict.keys()
    result = {}
    for name in names:
        result[name] = model_dict[name].predict(segment_list)
    
    return result

#A helper function to predict probabilities from models stored in a dict
def predict_proba_all_models(model_dict,segment_list):
    """
    This takes a dict of BeforeIAccept style models as input and provides
    a dict output with result keys corresponding to the input model keys,
    evaluated on a list of input policy segments. Returns the probability
    of the 1 class.
    """
    names = model_dict.keys()
    result = {}
    for name in names:
        result[name] = model_dict[name].predict_proba(segment_list)[:,1]
    
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
        
    #Evaluate all of the models
    model_dict = {
        'data_encryption':data_encryption_model,
        'data_retention':data_retention_model,
        'do_not_track':do_not_track_model,
        'first_party_collection':first_party_collection_model,
        'third_party_sharing':third_party_sharing_model,
        'user_access':user_access_model,
        'policy_change':policy_change_model}
    
    #Store results for each model category as dataframe, then sum up occurrences found.
    results = pd.DataFrame(predict_proba_all_models(model_dict,segments_processed))
    #DEBUGGING PURPOSES
    for col in list(results.columns):
        print(results[col])
    
    #Apply thresholds for classification
    results['data_encryption'] = results['data_encryption'].apply(lambda x: 1 if x >= 0.05 else 0)
    results = results.sum()
    
    #TO DO
    #Post-process results to achieve good document-level classification.
    result = results['data_encryption']
    result_text = 'DOES' if result >= 1 else "DOESN'T"

    return render_template("output.html", policy_text = policy_text, result_text = result_text)