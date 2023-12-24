from typing import TypedDict, Optional, List
from db import connect


class Card(TypedDict):
    name: str
    attack: int
    defense: int
    types: List[str]
    manas: List[str]


class Response(TypedDict):
    status: int
    message: Optional[str]
    data: List[Card]


def get_cards(user: str | None, data=None) -> Response:
    with connect() as conn:
        with conn.cursor() as cur:
            if user:
                cur.execute(
                    "SELECT cards.* " \
                    "FROM cards " \
                    "INNER JOIN user_cards ON cards.id = user_cards.card_id " \
                    "WHERE user_cards.user_id = %s", 
                    (user, )
                )
            else:
                cur.execute("SELECT cards.* FROM cards")
            cards = [{
                'name': card['name'],
                'attack': card['attack'],
                'defense': card['defense'],
                'types': card['types'],
                'manas': card['manas']
            } for card in cur.fetchall()]
            return {'status': 200, 'data': sorted(cards, key=lambda c: c['manas'])}
