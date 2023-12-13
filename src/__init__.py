from flask import Flask, redirect
from src.api import create_api
from src.vite import create_vite
from src.manage import build_command, schema_command, preset_command

def create_app() -> Flask:
    app = Flask(__name__)

    app.cli.add_command(build_command, 'build')
    app.cli.add_command(schema_command, 'schema')
    app.cli.add_command(preset_command, 'preset')

    app.register_blueprint(create_api(), url_prefix='/api')
    app.register_blueprint(create_vite(), url_prefix='/app')

    app.add_url_rule("/", 'index', lambda: redirect("/app", code=302))
    return app
