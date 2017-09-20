import requests
from bs4 import BeautifulSoup

def url_input_segmenter(url):
    """
    Input is url as a string. Parses body text and returns
    prettified version with line break characters removed and
    with document segmented into paragraphs as a list.
    Secondarily, searches the input url for its domain and returns
    domain in the form 'google.com'.
    """
    
    #Request URL
    page = requests.get(url)
    
    #TODO
    #Check that we got a good response and throw an error if not
    
    content = BeautifulSoup(page.content,'html.parser')
    
    #Parse URL paragraphs
    pars = [p.prettify() for p in content.find_all('p')]
    pars = [p.replace('\n','') for p in pars] #Remove new lines
    
    #Parse domain
    domain = '.'.join(url.split('//')[-1].split('/')[0].split('.')[-2:])
    return(pars, domain)