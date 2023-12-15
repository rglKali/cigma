import os
from flask import Flask

from src.api import create_api
from src.manage import build_command, schema_command, preset_command
from src.interface import init_interface


def create_app() -> Flask:
    app = Flask(__name__)
    app.secret_key = os.environ.get('FLASK_SECRET_KEY', 'supersecretflaskkey')

    app.cli.add_command(build_command, 'build')
    app.cli.add_command(schema_command, 'schema')
    app.cli.add_command(preset_command, 'preset')

    app.register_blueprint(create_api(), url_prefix='/api')
    
    return init_interface(app)
