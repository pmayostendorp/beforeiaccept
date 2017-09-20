#Set up our initial text cleaning function
from nltk.corpus import stopwords
from nltk.stem.snowball import *
import re
import string
    
def text_process_old(doc):
    """
    1. remove punctuation
    2. remove stopwords
    3. remove HTML tags
    4. remove '|||' inserted into corpus documents only
    """
    lst = [word for word in doc.split() if re.search(r'\<.*\>',word) is None]
    lst = ' '.join(lst)
    lst = [char for char in lst if char not in string.punctuation]
    lst = ''.join(lst)    
    lst = [word for word in lst.split() if word.lower() not in stopwords.words('english')]
    lst = [word for word in lst if word.replace('|||','')]
    return ' '.join(lst)
    
def text_process_policy(doc):
    """
    1. remove HTML tags
    2. remove punctuation
    3. remove stopwords
    4. stemming
    5. remove '|||' inserted into corpus documents only
    
    Returns a string of the processed doc.
    """
    sn = SnowballStemmer(language='english')
    
    lst = [word for word in doc.split() if re.search(r'\<.*\>',word) is None]
    lst = ' '.join(lst)
    lst = [char for char in lst if char not in string.punctuation]
    lst = ''.join(lst)    
    lst = [word.lower() for word in lst.split() if word.lower() not in stopwords.words('english')]
    lst = [sn.stem(word) for word in lst]
    lst = [word for word in lst if word.replace('|||','')]
    return ' '.join(lst)

def text_paragraph_segmenter(doc):
    """
    input: doc as string
    output: list of paragraphs with blank lines removed
    """
    
    lines = doc.split('\n')
    return [line for line in lines if line != '']