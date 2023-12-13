from flask import Blueprint
from .auth import create_auth


def create_api() -> Blueprint:
    bp = Blueprint('api', __name__)
    bp.register_blueprint(create_auth(), url_prefix='/auth')
    return bp
