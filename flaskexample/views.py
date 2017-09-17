from flask import render_template
from flask import request
from flaskexample import app
from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database
import psycopg2
from flaskexample.a_Model import ModelIt
from lib.text_processors import text_process_policy
import pandas as pd
import numpy as np
import nltk
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.ensemble import AdaBoostClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
import pickle

#Import our pickled models
with open('pickles/data_encryption_RF_policy.pkl', 'rb') as file:
    RFmodel = pickle.load(file)

with open('pickles/data_encryption_ADA_policy.pkl', 'rb') as file:
    ADAmodel = pickle.load(file)

#Which model shall we use?
model = RFmodel

@app.route('/')
@app.route('/index')
@app.route('/input')
def text_input():
    return render_template("input.html")

@app.route('/output')
def text_output():
  #pull policy text from the input field and store it
  policy_text = request.args.get('policy_text')
    #just select the Cesareans  from the birth dtabase for the month that the user inputs
  #print(policy_text)
  policy_text_processed = text_process_policy(policy_text)
  #print(policy_text_processed)
  result = model.predict([policy_text_processed])
  #print(result)
  result_text = 'DOES' if result == 1 else "DOESN'T"
  
  return render_template("output.html", policy_text = policy_text, result_text = result_text)