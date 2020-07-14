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

  menus_home = SideBarMenuModel(name="Home", href="/home", icon="Image", sort_order=1).save()
  menus_skill = SideBarMenuModel(name="기술 스택", href="/skills", icon="Code", sort_order=2).save()
  menus_setting = SideBarMenuModel(name="Settings", href="/settings", icon="Settings", sort_order=999).save()


  SideBarMenuModel.objects.insert([
    SideBarMenuModel(group=menus_home.name, name="Sub Home", href="/home/sub1", icon="Image", sort_order=1)
  ])
  
  SideBarMenuModel.objects.insert([
    SideBarMenuModel(group=menus_skill.name, name="ETL", href=f"{menus_skill.href}/etl", icon="Code", sort_order=1)
    , SideBarMenuModel(group=menus_skill.name, name="ELK", href=f"{menus_skill.href}/elk", icon="Code", sort_order=2)
    , SideBarMenuModel(group=menus_skill.name, name="CELERY", href=f"{menus_skill.href}/celery", icon="Code", sort_order=3)
    , SideBarMenuModel(group=menus_skill.name, name="Crawling", href=f"{menus_skill.href}/crawling", icon="Code", sort_order=4)
  ])

  menus_setting.save()