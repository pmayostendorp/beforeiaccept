#import sys
#sys.path.append('lib/')
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
#from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report, confusion_matrix
#from sklearn.externals import joblib
import pickle

#Import our pickled models
with open('pickles/data_encryption_RF_policy.pkl', 'rb') as file:
    RFmodel = pickle.load(file)

with open('pickles/data_encryption_ADA_policy.pkl', 'rb') as file:
    ADAmodel = pickle.load(file)

#Which model shall we use?
model = RFmodel

#Colors for basic text formatting
#green = '#5cd65c'
#red = '#e60000'

user = 'peterostendorp' #add your username here (same as previous postgreSQL)                      
host = 'localhost'
dbname = 'birth_db'
db = create_engine('postgres://%s%s/%s'%(user,host,dbname))
con = None
con = psycopg2.connect(database = dbname, user = user)

@app.route('/')
@app.route('/index')
def index():
    return render_template("index.html",
       title = 'Home', user = { 'nickname': 'Miguel' },
       )

# @app.route('/db')
# def birth_page():
#     sql_query = """                                                                       
#                 SELECT * FROM birth_data_table WHERE delivery_method='Cesarean';          
#                 """
#     query_results = pd.read_sql_query(sql_query,con)
#     births = ""
#     for i in range(0,10):
#         births += query_results.iloc[i]['birth_month']
#         births += "<br>"
#     return births

# @app.route('/db_fancy')
# def cesareans_page_fancy():
#     sql_query = """
#                SELECT index, attendant, birth_month FROM birth_data_table WHERE delivery_method='Cesarean';
#                 """
#     query_results=pd.read_sql_query(sql_query,con)
#     births = []
#     for i in range(0,query_results.shape[0]):
#         births.append(dict(index=query_results.iloc[i]['index'], attendant=query_results.iloc[i]['attendant'], birth_month=query_results.iloc[i]['birth_month']))
#     return render_template('caesarian.html',births=births)

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