from typing import TypedDict, Optional, List
from db import connect


class User(TypedDict):
    name: str
    balance: int


class Response(TypedDict):
    status: int
    message: Optional[str]
    data: User


def get_profile(user: str | None, data=None) -> Response:
    with connect() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT users.* FROM users WHERE users.id = %s", (user,))
            data = cur.fetchone()
            profile = {
                'name': data['name'],
                'balance': data['uav']
            }
            return {'status': 200, 'data': profile}
