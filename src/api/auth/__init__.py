from flask import Blueprint
from .routes import register, login, logout


def create_auth() -> Blueprint:
    bp = Blueprint('auth', __name__)
    bp.add_url_rule('/register', 'register', register, methods=['POST'])
    bp.add_url_rule('/login', 'login', login, methods=['POST'])
    bp.add_url_rule('/logout', 'logout', logout, methods=['GET'])
    return bp
