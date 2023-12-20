GET_USER_BY_ID = """
SELECT *
FROM users
WHERE id = %s
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
