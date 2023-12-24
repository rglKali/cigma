import os
import json
import click
from flask import Flask, request, abort, jsonify
from typing import TypedDict, Optional, Any
from db import connect
import controllers
import jwt


class RequestInterface(TypedDict):
    token: Optional[str]
    op: str
    data: Optional[Any]


class ResponseInterface(TypedDict):
    status: int
    message: Optional[str]
    data: Optional[Any]


# Creating flask app
app = Flask(__name__, static_folder='vite/dist', static_url_path='')


# Create controller function
# @typechecked
def process(data: RequestInterface) -> ResponseInterface:
    op = data.pop('op')

    controller = getattr(controllers, op, None)
    if controller is None:
        return {'message': 'Unknown operation', 'status': 404}

    user = None
    try:
        token = data.pop('token')
        try:
            user = jwt.decode(token, os.environ.get('FLASK_SECRET_KEY'))
        except jwt.JWTException as err:
            return {'message': str(err), 'status': 401}
        except Exception as err:
            return {'message': str(err), 'status': 500}
    except KeyError:
        pass

    try:
        return controller(user, data.get('data'))
    except TypeError as err:
        return {'message': str(err), 'status': 400}
    except Exception as err:
        return {'message': str(err), 'status': 500}


# Registering cli commands
@app.cli.command('build')
def build_command():
    """This is a command to build a frontend interface"""
    os.chdir('vite')
    os.system('yarn')
    os.system('yarn build')


@app.cli.command('schema')
@click.argument('path', default='schema.sql')
def schema_command(path: str):
    """This is a command to set up an empty database"""
    # Read the schema file
    if os.path.exists(path):
        app.logger.info(f'Reading schema from [{path}]')
        with open(path, 'r') as file:
            schema = file.read()
        app.logger.info('Executing schema')
        try:
            with connect() as conn:
                with conn.cursor() as cur:
                    cur.execute(schema)
                    conn.commit()
            app.logger.info('Success')
        except Exception as e:
            app.logger.error(e)
    else:
        app.logger.error(f'File [{path}] not found')


@app.cli.command('preset')
@click.argument('name', default='tes')
def preset_command(name: str):
    # Prepare the SQL query
    sql = "INSERT INTO cards (name, attack, defense, types, manas) VALUES (%s, %s, %s, %s, %s)"
    with connect() as conn:
        with conn.cursor() as cur:
            for item in json.load(open(f'presets/{name}.json')):
                cur.execute(sql, (
                    item['name'], item['attack'], item['defense'], 
                    "{" + ",".join(t for t in item['types']) + "}", 
                    "{" + ",".join(t for t in item['manas']) + "}", 
                ))
            conn.commit()

    print(f'Cards from preset "{name}" loaded')
    print(name)


# Register a single endpoint for serving both SPA Frontend and JSON-RPC Backend
@app.route('/', methods=['GET', 'POST'])
def route():
    match request.method:
        case 'GET':
            return app.send_static_file('index.html')
        case 'POST':
            response = process(request.get_json())
            status = response.pop('status')
            return jsonify(response), status
        case _:
            abort(405)


if __name__ == '__main__':
    app.logger.warning('Direct launching may cause unexpected behaviour. Consider using "flask run"')
    app.run()
