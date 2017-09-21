import requests
from bs4 import BeautifulSoup


def url_input_parser(url):
    """
    Input is url as a string. Parses body text and returns
    string of all paragraph elements in doc.
    Secondarily, searches the input url for its domain and returns
    domain in the form 'google.com'.
    """
    
    # Request URL
    page = requests.get(url)
    
    # TODO
    # Check that we got a good response and throw an error if not
    
    content = BeautifulSoup(page.content, 'html.parser')
    
    # Parse URL paragraphs
    pars = [p.prettify() for p in content.find_all('p')]
    pars = '\n'.join(pars)

    # Parse domain
    domain = '.'.join(url.split('//')[-1].split('/')[0].split('.')[-2:])
    return pars, domain
