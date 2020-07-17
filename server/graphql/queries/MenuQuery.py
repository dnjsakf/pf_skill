import graphene
from graphene_mongo import MongoengineConnectionField

from ..models import MenuModel
from ..types import MenuType

class MenuListQuery(graphene.ObjectType):
  class Meta:
    abstract = True

  menu_list = graphene.List(MenuType)

  @classmethod
  def resolve_menu_list(cls, root, info):
    return MenuModel.objects(group=None, usable=True).all().order_by("+sort_order")
