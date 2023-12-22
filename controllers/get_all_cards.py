from typing import TypedDict, Dict, List
from collections import Counter
from functools import cache
from db import connect
import querries as q


class Card(TypedDict):
    id: str
    name: str
    attack: int
    defense: int
    types: List[str]
    mana: Dict[str, int]


class Response(TypedDict):
    code: int
    data: List[Card]


def code2color(code: str) -> str:
    match code:
        case 'j': return 'yellow'
        case 'v': return 'green'
        case 'r': return 'red'
        case 'n': return 'black'
        case 'b': return 'blue'


@cache
def get_all_cards() -> Response:
    with connect() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT id, name, attack, defense, types, cost FROM cards")

            cards = []
            for row in cur.fetchall():
                card = {
                    'id': str(row['id']),
                    'name': row['name'],
                    'attack': row['attack'],
                    'defense': row['defense'],
                    'types': row['types'],
                    'mana': {code2color(item): count for item, count in Counter(row['cost']).items()}
                }
                cards.append(card)

            return {'code': 200, 'data': cards}
