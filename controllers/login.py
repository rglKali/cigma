from werkzeug.security import check_password_hash
from typing import TypedDict, Optional
from db import connect
import jwt


class Request(TypedDict):
    email: str
    password: str


class Response(TypedDict):
    status: int
    message: Optional[str]
    data: Optional[str]


def login(user: str | None, data: Request) -> Response:
    with connect() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM users WHERE email = %s", (data['email'],))
            user = cur.fetchone()
            if user:
                if check_password_hash(user['password'], data['password']):
                    return {'status': 200, 'data': jwt.encode(user['id'])}
                return {'status': 401, 'message': 'Invalid credentials'}
            return {'status': 401, 'message': 'User not found'}
