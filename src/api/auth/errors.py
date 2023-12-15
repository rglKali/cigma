class UserExists(Exception):
    """The user with this username or email already exists"""
    ...


class UserDoesNotExist(Exception):
    """The required user does not exist"""
    ...


class InvalidPassword(Exception):
    """The credentials are invalid"""
    ...
