from werkzeug.security import generate_password_hash, check_password_hash
from src.api.db import connect

from src.api.auth.errors import UserExists, UserDoesNotExist, InvalidPassword
from src.api.auth import utils


def get_user(user_id: str):
    with connect() as conn:
        with conn.cursor() as cur:
            cur.execute('SELECT * FROM users WHERE user_id = %s', (user_id,))
            user = cur.fetchone()
            if not user:
                raise UserDoesNotExist
            return user


def register_new_user(email: str, password: str, username: str):
    print(email, password, username)
    with connect() as conn:
        with conn.cursor() as cur:
            cur.execute('SELECT * FROM users WHERE email = %s', (email,))
            if cur.fetchone():
                raise UserExists()
            else:
                hashed_password = generate_password_hash(password)
                print(hashed_password)
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
                    return utils.generate_token(user['user_id'])
                raise InvalidPassword()
            raise UserDoesNotExist()
