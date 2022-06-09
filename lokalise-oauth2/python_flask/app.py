import os
from dotenv import load_dotenv
load_dotenv()

import lokalise

from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

@app.route('/')
def login():
    login_url = __auth_client().auth(
        ["read_projects"], "http://localhost:5000/callback", "secret state"
    )
    return render_template('login.html', login_url=login_url)


@app.route('/callback')
def callback():
    code = request.args.get('code', '')
    response = __auth_client().token(code)
    session['token'] = response['access_token']
    session['refresh_token'] = response['refresh_token']
    return redirect(url_for('projects'))

  
@app.route('/projects')
def projects():
    projects = __list_projects()

    return render_template('projects.html', projects=projects)


def __list_projects():
    try:
        return __oauth_client().projects().items
    except lokalise.errors.Unauthorized:
        response = __auth_client().refresh(session['refresh_token'])
        session['token'] = response['access_token']

        return __list_projects()


def __oauth_client():
    return lokalise.OAuthClient(session['token'])


def __auth_client():
  return lokalise.Auth(os.getenv('OAUTH2_CLIENT_ID'), os.getenv('OAUTH2_CLIENT_SECRET'))