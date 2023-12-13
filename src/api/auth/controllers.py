import jwt
import datetime as dt
from functools import wraps
from flask import jsonify, current_app, request
from werkzeug.security import generate_password_hash, check_password_hash
from src.api.db import connect
from src.api.auth.errors import UserExists, UserDoesNotExist, InvalidPassword


# Function to generate JWT token
def generate_token(user_id) -> str:
    payload = {
        'user_id': user_id,
        'exp': dt.datetime.utcnow() + dt.timedelta(days=1)  # Token expiration time set to 1 day
    }
    token = {**payload, 'token': jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')}
    return token


# Decorator function to check if the token is present and valid
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.cookies.get('token')

        if not token:
            return jsonify({'message': 'Token is missing'}), 401

        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = data['user_id']
        except:
            return jsonify({'message': 'Token is invalid'}), 401

        return f(current_user, *args, **kwargs)

    return decorated


def register_new_user(email: str, password: str, username: str):
    with connect() as conn:
        with conn.cursor() as cur:
            cur.execute('SELECT * FROM users WHERE email = %s', (email,))
            if cur.fetchone():
                raise UserExists()
            else:
                hashed_password = generate_password_hash(password)
                cur.execute('INSERT INTO users (email, username, password) VALUES (%s, %s, %s)',
                            (email, username, hashed_password))
                conn.commit()


def login_user(email: str, password: str):
    with connect() as conn:
        with conn.cursor() as cur:
            cur.execute('SELECT * FROM users WHERE email = %s', (email,))
            user = cur.fetchone()
            if user:
                if check_password_hash(user['password'], password):
                    return generate_token(user['user_id'])
                raise InvalidPassword()
            raise UserDoesNotExist()
