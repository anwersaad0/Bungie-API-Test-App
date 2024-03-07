from requests_oauthlib import OAuth2Session
from dotenv import load_dotenv
import os

load_dotenv()

API_KEY = os.environ.get("API_KEY")
CLIENT_ID = os.environ.get("CLIENT_ID")
CLIENT_SECRET = os.environ.get("CLIENT_SECRET")

AUTH_URL = "https://www.bungie.net/en/OAuth/Authorize"
TOKEN_URL = "https://www.bungie.net/platform/app/oauth/token/"

REDIRECT_URL = ""

session = OAuth2Session(client_id=CLIENT_ID, redirect_uri=REDIRECT_URL)

auth_link = session.authorization_url(AUTH_URL)

redirect_res = input("Paste redirect url with params here.")

session.fetch_token(
    client_id=CLIENT_ID,
    client_secret=CLIENT_SECRET,
    token_url=TOKEN_URL,
    authorization_response=redirect_res
)