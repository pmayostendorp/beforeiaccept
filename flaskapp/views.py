from flask import render_template
from flask import request
from flaskapp import app
# from sqlalchemy import create_engine
# from sqlalchemy_utils import database_exists, create_database
# import psycopg2
from lib.textprocessors import text_process_policy, text_paragraph_segmenter
from lib.urlparser import url_input_parser
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

# Data retention: RandomForestClassifier
with open('pickles/data_retention_RF_segment.pkl', 'rb') as file:
    data_retention_model = pickle.load(file)

# Do not track: MultinomialNB
with open('pickles/do_not_track_NB_segment.pkl', 'rb') as file:
    do_not_track_model = pickle.load(file)

# First party collection: MultinomialNB
with open('pickles/first_party_collection_NB_segment.pkl', 'rb') as file:
    first_party_collection_model = pickle.load(file)

# Third party sharing: RandomForestClassifier
with open('pickles/third_party_sharing_RF_segment.pkl', 'rb') as file:
    third_party_sharing_model = pickle.load(file)

# User access/deletion: RandomForestClassifier
with open('pickles/user_access_RF_segment.pkl', 'rb') as file:
    user_access_model = pickle.load(file)

# Policy changes: MultinomialNB
with open('pickles/policy_change_NB_segment.pkl', 'rb') as file:
    policy_change_model = pickle.load(file)

# All models we'll evaluate
model_dict = {
    'data_encryption': data_encryption_model,
    'data_retention': data_retention_model,
    'do_not_track': do_not_track_model,
    'first_party_collection': first_party_collection_model,
    'third_party_sharing': third_party_sharing_model,
    'user_access': user_access_model,
    'policy_change': policy_change_model}

# Model thresholds used for class determination.
model_thresholds = {
    'data_encryption': 0.05,
    'data_retention': 0.01,
    'do_not_track': 0.01,
    'first_party_collection': 0.3,
    'third_party_sharing': 0.16,
    'user_access': 0.05,
    'policy_change': 0.05}

policy_thresholds = {
    'data_encryption': 1,
    'data_retention': 1,
    'do_not_track': 1,
    'first_party_collection': 1,
    'third_party_sharing': 1,
    'user_access': 1,
    'policy_change': 1}


# A helper function to predict classes from models stored in a dict
def predict_all_models(model_dict, segment_list):
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


# A helper function to predict probabilities from models stored in a dict
def predict_proba_all_models(model_dict, segment_list, thresholds):
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
        tmp = model_dict[name].predict_proba(segment_list)[:, 1]
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
    # pull url from page
    url = request.args.get('url_text')
    print('URL: ' + url)

    # pull policy text from the input field and store it
    policy_text = request.args.get('policy_text')
    print('Policy text: ' + policy_text)

    # user input checks
    if url.strip() != '':
        text, domain = url_input_parser(url)
        segment_list = text_paragraph_segmenter(text)
    elif policy_text.strip() != '':
        segment_list = text_paragraph_segmenter(policy_text)
    else:
        return render_template("input.html")  # send 'em back home

    # Store the segments in a dataframe so we can serve them up later
    orig_segments = pd.DataFrame({'segments':segment_list})

    print('Total segments: ' + str(len(segment_list)))

    print('Raw segments:')
    print(segment_list)
    segments_processed = [text_process_policy(segment) for segment in segment_list]
    segments_processed = [segment for segment in segments_processed if segment.strip() != '']   # Remove blank lines

    # DEBUGGING PURPOSES
    print('Processed segments:')
    for segment in segments_processed:
        print(segment)

    # Store results for each model category as dataframe, then sum up occurrences found.
    tagged_segments = pd.DataFrame(predict_proba_all_models(model_dict, segments_processed, model_thresholds))
    # DEBUGGING PURPOSES
    print('Tagged segments:')
    for col in list(tagged_segments.columns):
        print(tagged_segments[col])

    # Now sum up the results so we track occurrences.
    results = tagged_segments.sum()
    print('Results:')
    print(results)

    # Join the original segments with the tagged segments so we can export them.
    tagged_segments = pd.concat([tagged_segments, orig_segments], axis=1)
    segments_data_encryption = list(tagged_segments[tagged_segments['data_encryption'] == 1]['segments'])
    segments_data_retention = list(tagged_segments[tagged_segments['data_retention'] == 1]['segments'])
    segments_do_not_track = list(tagged_segments[tagged_segments['do_not_track'] == 1]['segments'])
    segments_first_party_collection = list(tagged_segments[tagged_segments['first_party_collection'] == 1]['segments'])
    segments_third_party_sharing = list(tagged_segments[tagged_segments['third_party_sharing'] == 1]['segments'])
    segments_user_access = list(tagged_segments[tagged_segments['user_access'] == 1]['segments'])
    segments_policy_change = list(tagged_segments[tagged_segments['policy_change'] == 1]['segments'])

    # TODO
    # Post-process results to achieve good document-level classification.

    # Boolean flags
    bool_data_encryption = results['data_encryption'] >= policy_thresholds['data_encryption']
    bool_data_retention = results['data_retention'] >= policy_thresholds['data_retention']
    bool_do_not_track = results['do_not_track'] >= policy_thresholds['do_not_track']
    bool_first_party_collection = results['first_party_collection'] >= policy_thresholds['first_party_collection']
    bool_third_party_sharing = results['third_party_sharing'] >= policy_thresholds['third_party_sharing']
    bool_user_access = results['user_access'] >= policy_thresholds['user_access']
    bool_policy_change = results['policy_change'] >= policy_thresholds['policy_change']

    result_data_encryption = 'DOES' if bool_data_encryption else "DOESN'T"
    result_data_retention = 'MAY' if bool_data_retention else 'MAY NOT'
    result_do_not_track = 'DOES' if bool_do_not_track else "DOESN'T"
    result_first_party_collection = 'DOES' if bool_first_party_collection else "DOESN'T"
    result_third_party_sharing = 'DOES' if bool_third_party_sharing else "DOESN'T"
    result_user_access = 'DOES' if bool_user_access else "DOESN'T"
    result_policy_change = 'DOES' if bool_policy_change else "DOESN'T"

    return render_template("output.html", policy_text=policy_text,
                           segments_data_encryption=segments_data_encryption,
                           segments_data_retention=segments_data_retention,
                           segments_do_not_track=segments_do_not_track,
                           segments_first_party_collection=segments_first_party_collection,
                           segments_third_party_sharing=segments_third_party_sharing,
                           segments_user_access=segments_user_access,
                           segments_policy_change=segments_policy_change,
                           result_data_encryption=result_data_encryption,
                           result_data_retention=result_data_retention,
                           result_do_not_track=result_do_not_track,
                           result_first_party_collection=result_first_party_collection,
                           result_third_party_sharing=result_third_party_sharing,
                           result_user_access=result_user_access,
                           result_policy_change=result_policy_change,
                           bool_data_encryption=bool_data_encryption,
                           bool_data_retention=bool_data_retention,
                           bool_do_not_track=bool_do_not_track,
                           bool_first_party_collection=bool_first_party_collection,
                           bool_third_party_sharing=bool_third_party_sharing,
                           bool_user_access=bool_user_access,
                           bool_policy_change=bool_policy_change)
