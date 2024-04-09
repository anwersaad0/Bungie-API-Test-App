from flask import Blueprint, request
import requests
import os
import pydest

API_KEY = os.environ.get("API_KEY")
CLIENT_ID = os.environ.get("CLIENT_ID")
CLIENT_SECRET = os.environ.get("CLIENT_SECRET")

destiny = pydest.Pydest(API_KEY)

# deciding on establishing routes linking to API

bungie_auth = Blueprint('bungie_auth', __name__)

@bungie_auth.route('/')
def index():
    return False