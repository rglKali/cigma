import click
from flask.cli import with_appcontext


@click.command("build")
@with_appcontext
def build_command():
    """Builds vite frontend"""
    import os

    os.chdir("src/vite")
    os.system("yarn")
    os.system("yarn build")


@click.command("schema")
@with_appcontext
def schema_command():
    """Executes schema.sql"""
    from src.api.db import connect

    # Read the schema file
    with open('src/schema.sql', 'r') as file:
        schema = file.read()

    # Establish a connection to the database
    with connect() as conn:
        with conn.cursor() as cur:
            cur.execute(schema)
            conn.commit()

    print('Schema initializated')

@click.command("preset")
@click.argument("name")
@with_appcontext
def preset_command(name: str):
    """Loads cards from json into the database"""
    import json
    from src.api.db import connect

    # Prepare the SQL query
    sql = "INSERT INTO cards (card_name, card_types, mana_cost, attack, defense) VALUES (%s, %s, %s, %s, %s)"

    with connect() as conn:
        with conn.cursor() as cur:
            for item in json.load(open(f'data/{name}.json')):
                cur.execute(sql, (item['name'], "{" + ",".join("'" + t + "'" for t in item['types']) + "}", item['cost'], item['attack'], item['defense']))
            conn.commit()

    print(f'Cards from {name} preset loaded')
