# Set up our initial text cleaning function
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
    lst = [word for word in doc.split() if re.search(r'\<.*\>', word) is None]
    lst = ' '.join(lst)
    lst = [char for char in lst if char not in string.punctuation]
    lst = ''.join(lst)
    lst = [word for word in lst.split() if word.lower() not in stopwords.words('english')]
    lst = [word for word in lst if word.replace('|||', '')]
    return ' '.join(lst)


def text_process_policy(doc):
    """
    Takes in doc as string and returns a processed string
    by performing the following steps:
    1. remove HTML tags
    2. remove punctuation
    3. remove stopwords
    4. stemming
    5. remove any blank lines
    """
    sn = SnowballStemmer(language='english')

    s = re.sub(r'\<.*\>','',doc)
    lst = [char for char in s if char not in string.punctuation]
    lst = ''.join(lst)
    lst = [word.lower() for word in lst.split() if word.lower() not in stopwords.words('english')]
    lst = [sn.stem(word) for word in lst]
    return ' '.join(lst)

def reverse_paragraph_segmenter(doc):
    """
    input: doc as string
    output: list of paragraphs with blank lines removed, concatenated
    in reverse to that topic headings are concatenated with the
    paragraphs below them.
    """

    lines = doc.split('\n')
    segs = list()
    segs.append(lines[-1])
    c = -1
    for line in lines[::-1]:
        if len(line) < 75:  # Less than 75 chars wide in line join to prev line
            segs[c] = ' '.join([line, segs[c]])
        else:
            segs.insert(0, line)
            c -= 1

    return [line for line in segs if line.strip() != '']


def text_paragraph_segmenter(doc):
    """
    input: doc as string
    output: list of paragraphs with blank lines removed
    """

    lines = doc.split('\n')
    segs = list()
    segs.append(lines[0])
    c = 0
    for i in range(1, len(lines)):
        if len(lines[i]) < 75:  # Less than 75 chars wide in line join to prev line
            segs[c] = ' '.join([segs[c], lines[i]])
        else:
            segs.append(lines[i])
            c += 1

    return [line for line in segs if line.strip() != '']


def post_process_segments(segment_list):
    """
    :param segment_list: list of strings containing segments of document text
    :return: lst: a list of segments with URL tags and blanks removed

    Steps:
    1. remove HTML tags
    2. remove blank lines
    3. remove lines that are really short (1 word or less)
    """

    lst = [re.sub(r'\<.*\>', '', segment) for segment in segment_list]
    lst = [segment for segment in lst if segment.strip() != '']
    lst = [segment for segment in lst if len(segment.split()) > 1]
    return lst
