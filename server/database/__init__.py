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

  menus_home = SideBarMenuModel(title="Home", href="/home", icon="Image", sort_order=1)
  menus_home_sub1 = SideBarMenuModel(parent=menus_home.title, title="Sub Home", href="/home/sub1", icon="Image", sort_order=1)

  menus_skill = SideBarMenuModel(title="기술 스택", href="/skill-stack", icon="Image", sort_order=2)
  menus_skill_elk = SideBarMenuModel(parent=menus_skill.title, title="ELK", href="/skill-stack/elk", icon="Image", sort_order=1)

  menus_setting = SideBarMenuModel(title="Settings", href="/settings", icon="Settings", sort_order=999)


  menus_home.save()
  menus_home_sub1.save()
  
  menus_skill.save()
  menus_skill_elk.save()

  menus_setting.save()