from flask import (
  current_app as app
  , send_from_directory
)

# Set Root Route
@app.route("/", methods=["GET"])
@app.route("/<path:path>", methods=["GET"])
def index(path=None):
  return send_from_directory(app.config["BUILD_PATH"], 'index.html')
