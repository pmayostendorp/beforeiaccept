from bs4 import BeautifulSoup
from bs4.element import Comment
import urllib


def tag_visible(element):
    if element.parent.name in ['style', 'script', 'head', 'title', 'meta', '[document]']:
        return False
    if isinstance(element, Comment):
        return False
    return True


def text_from_html(body):
    soup = BeautifulSoup(body, 'html.parser')
    texts = soup.findAll(text=True)
    visible_texts = filter(tag_visible, texts)
    return u"\n".join(t.strip() for t in visible_texts)


def url_input_parser(url):
    """
    Input is url as a string. Parses body text and returns
    string of all paragraph elements in doc.
    Secondarily, searches the input url for its domain and returns
    domain in the form 'google.com'.
    """

    # Request URL
    page = urllib.request.urlopen(url)

    # Check we got a good response, otherwise complain
    if str(page.code)[0] != '2':
        e = urllib.error.URLError('The server returned status code ' + str(page.code))
        raise e

    content = page.read()

    # Parse URL paragraphs
    pars = text_from_html(content)

    # Parse domain
    domain = '.'.join(url.split('//')[-1].split('/')[0].split('.')[-2:])
    return pars, domain
