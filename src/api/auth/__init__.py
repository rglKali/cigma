from flask import Blueprint
from src.api.auth.routes import register, login, logout, check


def create_auth() -> Blueprint:
    bp = Blueprint('auth', __name__)
    bp.add_url_rule('/register', 'register', register, methods=['POST'])
    bp.add_url_rule('/login', 'login', login, methods=['POST'])
    bp.add_url_rule('/logout', 'logout', logout, methods=['GET'])
    bp.add_url_rule('/check', 'check', check, methods=['GET'])
    return bp
