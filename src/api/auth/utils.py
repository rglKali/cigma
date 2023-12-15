import jwt
import datetime as dt
from functools import wraps
from flask import jsonify, current_app, request, make_response

from src.api.auth import controllers as c


# Decorator function to check if the token is present and valid
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.cookies.get('token')

        if not token:
            return jsonify({'error': 'Token is missing'}), 401

        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = c.get_user(data['user_id'])
        except:
            return jsonify({'error': 'Token is invalid'}), 401

        if dt.datetime.utcfromtimestamp(data['exp']) > dt.datetime.utcnow():
            response = make_response(jsonify({'error': 'Token expired'}))
            response.set_cookie('token', '', expires=0)
            return response, 403

        return f(current_user, *args, **kwargs)

    return decorated


# Function to generate JWT token
def generate_token(user_id) -> str:
    payload = {
        'user_id': user_id,
        'exp': str((dt.datetime.utcnow() + dt.timedelta(days=1)).timestamp())  # Token expiration time set to 1 day
    }
    print(payload)
    print(current_app.config['SECRET_KEY'])
    token = {**payload, 'token': jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')}
    return token
    # return jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')
