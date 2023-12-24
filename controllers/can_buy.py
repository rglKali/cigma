from typing import TypedDict, Optional, List
from db import connect


class Response(TypedDict):
    status: int
    message: Optional[str]
    data: bool


def can_buy_a_card(user: str | None, data=None) -> Response:
    with connect() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT users.uav FROM users WHERE users.id = %s", (user,))
            data = cur.fetchone()
            return {'status': 200, 'data': data['uav'] > 0}
