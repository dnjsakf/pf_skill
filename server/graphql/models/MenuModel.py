from mongoengine import Document, fields
from mongoengine.queryset import queryset_manager

class MenuModel(Document):
  meta = {
    "collection": "menu_mst"
  }
  
  group = fields.StringField()
  name = fields.StringField(required=True)
  
  label = fields.StringField(required=True)
  href = fields.StringField(required=True)
  icon = fields.StringField()

  sort_order = fields.IntField()
  usable = fields.BooleanField(default=True)