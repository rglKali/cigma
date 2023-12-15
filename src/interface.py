import os
import importlib
from flask import Flask, redirect


def safe_import(name: str):
    try:
        module = importlib.import_module(f"src.{name}")
        return getattr(module, f"create_{name}")
    except ImportError as e:
        print(f"Error importing module: {e}")
        return None
    except AttributeError as e:
        print(f"Function not found in module: {e}")
        return None


def init_interface(app: Flask) -> None:
    interface = os.environ.get('INTERFACE')
    app.logger.info(f'Running flask API with {interface} interface')
    if interface is None:
        # print('Running flask API with No interface')
        return app
    factory = safe_import(interface)

    app.register_blueprint(factory(), url_prefix='/app')
    app.add_url_rule("/", 'index', lambda: redirect("/app", code=302))

    return app
