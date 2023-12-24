from typing import TypedDict


class Response(TypedDict):
    status: int
    message: str


def ping(user: str | None, data=None) -> Response:
    return {'status': 200, 'message': 'pong'}
