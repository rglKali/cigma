import os
import psycopg2 as pg
from psycopg2.extras import RealDictCursor


def connect():
    return pg.connect(
        host=os.environ.get("DB_HOST", "localhost"),
        database=os.environ.get("DB_DATABASE", "cigma"),
        user=os.environ.get("DB_USERNAME", "kali"),
        password=os.environ.get("DB_PASSWORD", "kali"),
        port=os.environ.get("DB_PORT", 5432),
        cursor_factory=RealDictCursor
    )
