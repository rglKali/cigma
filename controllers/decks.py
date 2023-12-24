from typing import TypedDict, Optional, List
from db import connect

from .cards import Card


class Deck(TypedDict):
    name: str
    general: Card
    cards: List[Card]


class Response(TypedDict):
    status: int
    message: Optional[str]
    data: List[Deck]


def get_decks(user: str | None, data=None) -> Response:
    with connect() as conn:
        with conn.cursor() as cur:
            ...
