from flask import Blueprint, request, session
from uuid import uuid4

import os
import pydest
import urllib
import urllib.parse

API_KEY = os.environ.get("API_KEY")
CLIENT_ID = os.environ.get("CLIENT_ID")
CLIENT_SECRET = os.environ.get("CLIENT_SECRET")

AUTH_URL = "https://www.bungie.net/en/OAuth/Authorize"

destiny = pydest.Pydest(API_KEY)

# deciding on establishing routes linking to API

bungie_auth = Blueprint('/bungie_auth', __name__)

def save_created_state(state):
    session['state_token'] = state
    pass

def make_auth_url():
    state = str(uuid4())
    save_created_state(state)
    return state

def check_valid_state(state):
    saved_state = session['state_token']
    if state == saved_state:
        print("It's a match!")
        return True
    else:
        return False

@bungie_auth.route('/')
def index():
    state = make_auth_url()
    state_params = {'state': state}
    url = AUTH_URL + urllib.parse.quote(state_params)
    return 0