# api/models.py
import graphene
from graphene.relay import Node
from graphene_mongo import MongoengineObjectType

from ..models import MenuModel


class SubMenuType(MongoengineObjectType):
  class Meta:
    model = MenuModel
    interfaces = (Node, )

class MenuType(MongoengineObjectType):
  class Meta:
    model = MenuModel
    interfaces = (Node, )

  sub_menu_list = graphene.List(SubMenuType)

  def resolve_sub_menu_list(parent, info, **input):
    return MenuModel.objects(group=parent.name).all().order_by("+sort_order")