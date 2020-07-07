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

  menus_home = SideBarMenuModel(title="Home", href="/home", icon="Image", sort_order=1).save()
  menus_skill = SideBarMenuModel(title="기술 스택", href="/skills", icon="Code", sort_order=2).save()
  menus_setting = SideBarMenuModel(title="Settings", href="/settings", icon="Settings", sort_order=999).save()


  SideBarMenuModel.objects.insert([
    SideBarMenuModel(parent=menus_home.title, title="Sub Home", href="/home/sub1", icon="Image", sort_order=1)
  ])
  
  SideBarMenuModel.objects.insert([
    SideBarMenuModel(parent=menus_skill.title, title="ETL", href=f"{menus_skill.href}/etl", icon="Code", sort_order=1)
    , SideBarMenuModel(parent=menus_skill.title, title="ELK", href=f"{menus_skill.href}/elk", icon="Code", sort_order=2)
    , SideBarMenuModel(parent=menus_skill.title, title="CELERY", href=f"{menus_skill.href}/celery", icon="Code", sort_order=3)
    , SideBarMenuModel(parent=menus_skill.title, title="Crawling", href=f"{menus_skill.href}/crawling", icon="Code", sort_order=4)
  ])

  menus_setting.save()