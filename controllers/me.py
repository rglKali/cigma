from typing import TypedDict, Optional
from db import connect
import querries as q


class Data(TypedDict):
    id: str
    user: str


class Response(TypedDict):
    message: Optional[str]
    error: Optional[str]
    code: int
    data: Optional[Data]


def me(caller: str) -> Response:
    with connect() as conn:
        with conn.cursor() as cur:
            cur.execute(q.GET_USER_BY_ID, (caller,))
            user = cur.fetchone()
            if user:
                return {'code': 200, 'data': user['name']}
            return {'error': 'User not found', 'code': 404}
