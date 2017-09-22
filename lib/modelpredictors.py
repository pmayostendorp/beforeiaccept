import numpy as np
# import nltk
# from sklearn.feature_extraction.text import CountVectorizer
# from sklearn.feature_extraction.text import TfidfTransformer
# from sklearn.ensemble import AdaBoostClassifier
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.pipeline import Pipeline


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
    evaluated on a list of input policy segments. Returns the probabilities (prob) and
    classification results (cls) as evaluated against thresholds, a dict of thresholds corresponding
    to the models in model_dict.
    """
    names = model_dict.keys()
    prob = {}
    cls = {}
    for name in names:
        prob[name] = np.array(model_dict[name].predict_proba(segment_list))
        prob[name] = prob[name][:, 1]
        tmp = prob[name]
        tmp[tmp >= thresholds[name]] = 1
        tmp[tmp < thresholds[name]] = 0
        cls[name] = tmp

    return prob, cls
