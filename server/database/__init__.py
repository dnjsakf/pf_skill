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
  from server.graphql.models import MenuModel

  home = MenuModel(name="Home", label="홈", href="/home", icon="Image", sort_order=1).save()
  skills = MenuModel(name="Skills", label="기술 스택", href="/skills", icon="Code", sort_order=2).save()
  settings = MenuModel(name="Settings", label="설정", href="/settings", icon="Settings", sort_order=999).save()


  MenuModel.objects.insert([
    MenuModel(group=home.name, name="SubHome", label="서브 홈", href="/home/sub1", icon="Image", sort_order=1)
  ])
  
  MenuModel.objects.insert([
    MenuModel(group=skills.name, name="ETL", label="ETL", href=f"{skills.href}/etl", icon="Code", sort_order=1)
    , MenuModel(group=skills.name, name="ELK", label="ELK", href=f"{skills.href}/elk", icon="Code", sort_order=2)
    , MenuModel(group=skills.name, name="CELERY", label="CELERY", href=f"{skills.href}/celery", icon="Code", sort_order=3)
    , MenuModel(group=skills.name, name="Crawling", label="크롤링", href=f"{skills.href}/crawling", icon="Code", sort_order=4)
  ])

  settings.save()