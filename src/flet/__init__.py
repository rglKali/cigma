from flask import Blueprint


def create_flet() -> Blueprint:
    bp = Blueprint('app', __name__, static_folder='dist', static_url_path='/')

    # Serve React App
    bp.add_url_rule('/', 'index', lambda: bp.send_static_file('index.html'))
    # bp.add_url_rule('/<path:path>', 'catch_all', lambda _: bp.send_static_file('index.html'))
    # bp.app_errorhandler(404)(lambda _: bp.send_static_file('index.html'))
    return bp
