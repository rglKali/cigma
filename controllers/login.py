from werkzeug.security import check_password_hash
from typing import TypedDict, Optional
from db import connect
import querries as q


class Request(TypedDict):
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


def login(data: Request) -> Response:
    with connect() as conn:
        with conn.cursor() as cur:
            cur.execute(q.GET_USER_BY_EMAIL, (data['email'],))
            user = cur.fetchone()
            if user:
                if check_password_hash(user['password'], data['password']):
                    return {'message': 'Log in successful', 'code': 200, 'data': {'id': user['id'], 'user': user['name']}}
                return {'error': 'Invalid credentials', 'code': 401}
            return {'error': 'User not found', 'code': 404}
