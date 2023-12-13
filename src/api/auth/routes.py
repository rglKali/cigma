from flask import jsonify, request, make_response

from src.api.auth.controllers import register_new_user, login_user
from src.api.auth.errors import UserExists, UserDoesNotExist, InvalidPassword


def register():
    data = request.get_json()
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')

    if not email or not username or not password:
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        register_new_user(email, password, username)
    except UserExists:
        return jsonify({'error': 'An account associated with this email already exists'}), 409

    return jsonify({'message': 'Registration successful'}), 201


def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Missing email or password'}), 400

    try:
        token = login_user(email, password)
    except UserDoesNotExist:
        return jsonify({'error': 'User not found'}), 401
    except InvalidPassword:
        return jsonify({'error': 'Invalid credentials'}), 401

    response = make_response(jsonify({'message': 'Logged in successfully'}))
    response.set_cookie('token', token['token'], expires=token['exp'], httponly=True)
    return response, 200


def logout():
    response = make_response(jsonify({'message': 'Logged out successfully'}))
    response.set_cookie('token', '', expires=0)
    return response
