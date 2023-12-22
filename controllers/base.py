from typing import Any


class Controller:
    request: Any
    response: Any

    def __init__(self, user: str = None, data: request = None) -> None:
        self.user = user
        self.data = data

        self.process()

    def process(self):
        raise NotImplementedError

    @property
    def json(self) -> response:
        raise NotImplementedError
