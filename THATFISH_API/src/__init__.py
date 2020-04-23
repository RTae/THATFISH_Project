import os
from flask import Flask

def create_app():
    app = Flask(__name__)
    from . import main
    app.register_blueprint(main.appBlueprint)

    return app