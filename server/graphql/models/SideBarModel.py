from mongoengine import Document, fields
from mongoengine.queryset import queryset_manager

class SideBarMenuModel(Document):
  meta = {
    "collection": "side_bar_menu_mst"
  }
  # no = fields.SequenceField(collection_name="sidebar_menu_mst")

  title = fields.StringField(required=True)
  href = fields.StringField(required=True)
  icon = fields.StringField()

  sort_order = fields.IntField()
  usable = fields.BooleanField(default=True)