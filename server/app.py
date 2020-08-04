import os

from flask import Flask
from flask_cors import CORS
from flask_graphql import GraphQLView

from server.graphql import schema
from server.database import connect_db

def create_app(*args, **kwargs):
  APP_PATH = os.path.dirname(os.path.abspath(__file__))  
  ROOT_PATH = kwargs.get("ROOT_PATH", os.path.join(APP_PATH, "../"))
  BUILD_PATH = kwargs.get("BUILD_PATH", os.path.join(ROOT_PATH, 'dist'))
  STATIC_PATH = kwargs.get("STATIC_PATH", os.path.join(BUILD_PATH, 'dist'))
  TEMPLATE_PATH = os.path.join(APP_PATH, "templates")

  print( ROOT_PATH )
  print( BUILD_PATH )
  print( STATIC_PATH )
  print( TEMPLATE_PATH )

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
    flask_config = os.environ.get("FLASK_CONFIG", "config/flask.config.py")
    if flask_config is not None:
      app.config.from_pyfile(flask_config)

    # Set GraphQL EndPoint 설정
    app.add_url_rule(
      '/graphql',
      view_func=GraphQLView.as_view(
        'graphql',
        schema=schema,
        graphiql=True
      )
    )

    # Set CORS Middleware
    CORS(app=app, resources={
      r"*": { "origin": "*" }
    })
    
    # Set Routes
    from server import routes

    import pprint

    MONGO_HOST=os.environ.get("FLASK_MONGO_URL", app.config.get("FLASK_MONGO_URL", None))
    MONGO_DATABASE=os.environ.get("FLASK_MONGO_DATABASE", app.config.get("FLASK_MONGO_DATABASE", None))

    connect_db(app.config["FLASK_MONGO_DATABASE"], app.config["FLASK_MONGO_URL"], mockup=True)
  
  return app