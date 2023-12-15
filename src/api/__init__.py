from flask import Blueprint
from src.api.auth import create_auth
from src.api.card import create_card


def create_api() -> Blueprint:
    bp = Blueprint('api', __name__)
    bp.register_blueprint(create_auth(), url_prefix='/auth')
    bp.register_blueprint(create_card(), url_prefix='/card')
    return bp
