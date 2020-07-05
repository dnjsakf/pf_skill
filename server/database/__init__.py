from mongoengine import connect

connection = None

def connect_db(database, host, mockup=False, **kwargs):
  global connection

  if connection is None:
    connection = connect(database, host=host, alias="default")

    if mockup == True: 
      init_mockup()

def init_mockup():
  import datetime
  from server.graphql.models import SideBarMenuModel

  menus_home = SideBarMenuModel(title="Home", href="/home", icon="ImageIcon", sort_order=1)
  menus_test = SideBarMenuModel(title="Test", href="/test", icon="ImageIcon", sort_order=2)

  menus_home.save()
  menus_test.save()