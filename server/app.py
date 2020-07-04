import os

from flask import Flask
from flask_cors import CORS

def create_app(*args, **kwargs):
  APP_PATH = os.path.dirname(os.path.abspath(__file__))  
  ROOT_PATH = kwargs.get("ROOT_PATH", os.path.join(APP_PATH, "../"))
  BUILD_PATH = kwargs.get("BUILD_PATH", os.path.join(ROOT_PATH, 'dist'))
  STATIC_PATH = kwargs.get("STATIC_PATH", os.path.join(BUILD_PATH, 'dist/public'))
  TEMPLATE_PATH = os.path.join(APP_PATH, "templates")

  # Application
  app = Flask(
    __name__,
    static_url_path="/public/",
    static_folder=STATIC_PATH,
    template_folder=TEMPLATE_PATH
  )

  app.config["BUILD_PATH"] = BUILD_PATH

  with app.app_context():
    # Set Configuration
    config_py = os.environ.get("FLAKS_APP_CONFIG_PY", None)
    if config_py is not None and os.path.exists( config_py ):
      app.config.from_pyfile(config_py)
    
    # Set CORS Middleware
    CORS(app=app, resources={
      r"*": { "origin": "*" }
    })
    
    # Set Routes
    from server import routes
  
  return app