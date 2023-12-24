from werkzeug.security import generate_password_hash
from typing import TypedDict, Optional
from db import connect
import jwt


class Request(TypedDict):
    username: str
    email: str
    password: str


class Response(TypedDict):
    message: Optional[str]
    error: Optional[str]
    status: int
    data: Optional[str]


def register(user: str | None, data: Request) -> Response:
    with connect() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM users WHERE email = %s", (data['email'],))
            if cur.fetchone():
                return {'message': 'User Exists', 'status': 409}
            else:
                hashed_password = generate_password_hash(data['password'])
                cur.execute(
                    "INSERT INTO users (name, email, password) " \
                    "VALUES (%s, %s, %s) " \
                    "RETURNING *",
                    (data['email'], data['username'], hashed_password)
                )
                user = cur.fetchone()
                return {'status': 201, 'data': jwt.encode(user['id'])}
