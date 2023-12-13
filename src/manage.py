import os
import click
from flask.cli import with_appcontext
from src.api.db import connect


@click.command("build")
@with_appcontext
def build_command():
    """Builds vite frontend"""
    os.chdir("src/vite")
    os.system("yarn")
    os.system("yarn build")


@click.command("schema")
@with_appcontext
def schema_command():
    """Executes schema.sql"""

    # Read the schema file
    with open('schema.sql', 'r') as file:
        schema = file.read()

    # Establish a connection to the database
    with connect() as conn:
        with conn.cursor() as cur:
            cur.execute(schema)
            conn.commit()

    print('Schema initializated')
