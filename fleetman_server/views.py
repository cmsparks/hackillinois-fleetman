from fleetman_server import app
from flask import (render_template)

@app.route('/', methods=['GET'])
def serve_dir_directory_index():
    return render_template("index.html", flask_token="Hello   world")

from fleetman_server.api import db, fleet
