import os
import json
import click
from db import connect
from flask import Flask, request, abort, jsonify
from typing import TypedDict, Optional, Any
import controllers


class RequestInterface(TypedDict):
    caller: Optional[str]
    op: str
    data: Optional[Any]


class ResponseInterface(TypedDict):
    status: int
    message: Optional[str]
    error: Optional[str]
    data: Optional[Any]


# Creating flask app
app = Flask(__name__, static_folder='vite/dist', static_url_path='')


# Create controller function
# @typechecked
def process(data: RequestInterface) -> ResponseInterface:
    op = data.pop('op')
    controller = getattr(controllers, op, None)

    if controller is None:
        return {'error': 'Unknown operation', 'code': 404}

    try:
        return controller(**data)
    except TypeError as err:
        return {'error': str(err), 'code': 400}
    except Exception as err:
        return {'error': str(err), 'code': 500}


# Registering cli commands
@app.cli.command('build')
def build_command():
    """This is a command to build a frontend interface"""
    os.chdir('static')
    os.system('yarn build')


@app.cli.command('schema')
def schema_command():
    """This is a command to set up an empty database"""
    # Read the schema file
    with open('schema.sql', 'r') as file:
        schema = file.read()

    with connect() as conn:
        with conn.cursor() as cur:
            cur.execute(schema)
            conn.commit()


@app.cli.command('preset')
@click.argument('name')
def preset_command(name: str):
    sql = "INSERT INTO cards (name, types, cost, attack, defense) VALUES (%s, %s, %s, %s, %s)"

    with connect() as conn:
        with conn.cursor() as cur:
            for item in json.load(open(f'presets/{name}.json')):
                cur.execute(sql, (item['name'], "{" + ",".join("'" + t + "'" for t in item['types']) + "}", item['cost'], item['attack'], item['defense']))
            conn.commit()

    print(f'Cards from preset "{name}" loaded')


# Register a single endpoint for serving both SPA Frontend and JSON-RPC Backend
@app.route('/', methods=['GET', 'POST'])
def route():
    match request.method:
        case 'GET':
            return app.send_static_file('index.html')
        case 'POST':
            response = process(request.get_json())
            return jsonify(response), response['code']
        case _:
            abort(405)


if __name__ == '__main__':
    app.run()
