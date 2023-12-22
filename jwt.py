import os
import json
import base64
import hmac
import hashlib
import datetime


class JWTException(Exception):
    """Base JWT Exception"""


class InvalidFormat(JWTException):
    """Invalid token format"""


class InvalidSignature(JWTException):
    """Invalid token signature"""


class TokenExpired(JWTException):
    """Token has expired"""


class InvalidPayload(JWTException):
    """Invalid Token Payload"""


def encode(user, secret_key=os.environ.get('FLASK_SECRET_KEY'), exp_time=os.environ.get('JWT_EXP', 604800)) -> str:
    header = {'alg': 'HS256', 'typ': 'JWT'}
    
    # Adding issued at and expiration time
    exp = datetime.datetime.utcnow() + datetime.timedelta(seconds=exp_time)
    payload = {
        'exp': exp.timestamp(),
        'usr': user
    }
    
    # Encoding header and payload
    encoded_header = base64.urlsafe_b64encode(json.dumps(header).encode()).decode()
    encoded_payload = base64.urlsafe_b64encode(json.dumps(payload).encode()).decode()
    
    # Creating the signature
    signature = hmac.new(secret_key.encode(), f"{encoded_header}.{encoded_payload}".encode(), hashlib.sha256)
    encoded_signature = base64.urlsafe_b64encode(signature.digest()).decode()
    
    # Concatenating the parts to create the JWT token
    jwt_token = f"{encoded_header}.{encoded_payload}.{encoded_signature}"
    
    return jwt_token


def decode(token, secret_key=os.environ.get('FLASK_SECRET_KEY')) -> str:
    try:
        encoded_header, encoded_payload, encoded_signature = token.split('.')
    except ValueError:
        raise InvalidFormat('Invalid token format')
    
    # Verifying the signature
    expected_signature = hmac.new(secret_key.encode(), f"{encoded_header}.{encoded_payload}".encode(), hashlib.sha256)
    calculated_signature = base64.urlsafe_b64decode(encoded_signature)
    
    if not hmac.compare_digest(expected_signature.digest(), calculated_signature):
        raise InvalidSignature('Invalid token signature')
    
    # Decoding the payload
    decoded_payload = base64.urlsafe_b64decode(encoded_payload + '=' * (-len(encoded_payload) % 4)).decode()
    payload = json.loads(decoded_payload)

    # Validate the payload
    if 'exp' not in payload or 'usr' not in payload or not isinstance(payload['usr'], str) or not isinstance(payload['exp'], float):
        raise InvalidPayload('Invalid token Payload')

    # Checking expiration time
    if datetime.datetime.utcnow() > datetime.datetime.fromtimestamp(payload['exp']):
        raise TokenExpired('Token has expired')

    return payload['usr']
