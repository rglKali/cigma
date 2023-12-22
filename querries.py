GET_USER_BY_ID = """
SELECT *
FROM users
WHERE id = %s;
"""

GET_USER_BY_EMAIL = """
SELECT *
FROM users
WHERE email = %s;
"""

REGISTER_NEW_USER = """
INSERT INTO users (name, email, password)
VALUES (%s, %s, %s)
RETURNING *;
"""

GET_ALL_CARDS = """
SELECT id, name, attack, defense, types, cost 
FROM cards;
"""

GET_VALID_CARDS_FOR_GENERAL = """
SELECT id, name, types, cost, attack, defense
FROM cards
WHERE id <> %s
AND NOT EXISTS (
    SELECT 1
    FROM (
        SELECT UNNEST(cost) AS color
        FROM cards
        WHERE id = %s
    ) AS target_colors
    WHERE NOT EXISTS (
        SELECT 1
        FROM (
            SELECT UNNEST(cost) AS color
            FROM cards c2
            WHERE c2.id = cards.id
        ) AS other_colors
        EXCEPT
        SELECT *
        FROM (
            SELECT UNNEST(cost) AS color
            FROM cards
            WHERE id = %s
        ) AS target_colors
    )
);
"""
