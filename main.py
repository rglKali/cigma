import os
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

    token = data.pop('token')
    if token is not None:
        try:
            user = jwt.decode(token, app.secret_key)
        except jwt.JWTException as err:
            return {'error': str(err), 'code': 401}
        except Exception as err:
            {'error': str(err), 'code': 500}
    else:
        user = None

    try:
        return controller(user, data.get('data'))
    except TypeError as err:
        return {'error': str(err), 'code': 400}
    except Exception as err:
        return {'error': str(err), 'code': 500}


# Registering cli commands
@app.cli.command('build')
def build_command():
    """This is a command to build a frontend interface"""
    os.chdir('vite')
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
@click.argument('name', default='tes.json')
def preset_command(name: str):
    print(name)


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
    app.logger.warning('Direct launching may cause unexpected behaviour. Consider using "flask run"')
    app.run()
