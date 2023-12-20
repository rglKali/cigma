from werkzeug.security import generate_password_hash
from typing import TypedDict, Optional
from db import connect
import querries as q


class Request(TypedDict):
    username: str
    email: str
    password: str


class Data(TypedDict):
    id: str
    user: str


class Response(TypedDict):
    message: Optional[str]
    error: Optional[str]
    code: int
    data: Optional[Data]


def register(data: Request) -> Response:
    with connect() as conn:
        with conn.cursor() as cur:
            cur.execute(q.GET_USER_BY_EMAIL, (data['email'],))
            if cur.fetchone():
                return {'error': 'UserExists', 'code': 409}
            else:
                hashed_password = generate_password_hash(data['password'])
                cur.execute(q.REGISTER_NEW_USER, (data['email'], data['username'], hashed_password))
                user = cur.fetchone()
                conn.commit()
                return {'message': 'Registration Successful', 'code': 201, 'data': {'id': user['id'], 'user': user['name']}}
