# app.py
import os
import dotenv
from server.app import create_app

# Load Environment Variables
dotenv.load_dotenv(dotenv_path="server/config/.dev.env")

# Set Constant Variables
ROOT_PATH = os.path.dirname(os.path.abspath(__file__))

# Create Flask APP
app = create_app(**{
  "ROOT_PATH": ROOT_PATH,
  "BUILD_PATH": os.path.join(ROOT_PATH, "dist"),
  "STATIC_PATH": os.path.join(ROOT_PATH, "dist")
})

if __name__ == '__main__':
  os.environ.putenv("FLASK_MODE", "development")
  # Run Server
  app.run(host="0.0.0.0", port=3000)