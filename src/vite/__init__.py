from flask import Blueprint


def create_vite() -> Blueprint:
    bp = Blueprint('app', __name__, static_folder='dist', static_url_path='/')
    bp.add_url_rule('/', 'index', lambda: bp.send_static_file('index.html'))
    return bp
