from flask import Blueprint


def create_card() -> Blueprint:
    bp = Blueprint('cards', __name__)
    return bp
