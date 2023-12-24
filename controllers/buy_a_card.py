from typing import TypedDict, Optional, List
from .can_buy import can_buy_a_card
from random import choice
from .cards import Card
from db import connect


class Response(TypedDict):
    status: int
    message: Optional[str]
    data: Optional[Card]


def buy_a_card(user: str | None, data=None) -> Response:
    can_buy = can_buy_a_card(user)
    if not can_buy['data']:
        return {'status': 402, 'message': 'Insufficient Balance'}

    with connect() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT cards.* " \
                "FROM cards " \
                "WHERE NOT EXISTS (" \
                "    SELECT 1 " \
                "    FROM user_cards " \
                "    WHERE user_cards.card_id = cards.id" \
                "    AND user_cards.user_id = %s" \
                ");",
                (user,)
            )
            cards = [c for c in cur.fetchall()]

            if not len(cards):
                return {'status': 402, 'message': 'Collection is full'}

            card = choice(cards)
            cur.execute(
                "INSERT INTO user_cards (user_id, card_id)" \
                "VALUES (%s, %s);",
                (user, card['id'])
            )
            cur.execute(
                "UPDATE users " \
                "SET uav = uav - 1 " \
                "WHERE id = %s;",
                (user, )
            )

            return {'status': 200, 'data': {
                'name': card['name'],
                'attack': card['attack'],
                'defense': card['defense'],
                'types': card['types'],
                'manas': card['manas']
            }}
