# api/models.py
import graphene
from graphene.relay import Node
from graphene_mongo import MongoengineObjectType

from ..models import SideBarMenuModel


class SideBarSubMenuType(MongoengineObjectType):
  class Meta:
    model = SideBarMenuModel
    interfaces = (Node, )

class SideBarMenuType(MongoengineObjectType):
  class Meta:
    model = SideBarMenuModel
    interfaces = (Node, )

  sub_menus = graphene.List(SideBarSubMenuType)

  def resolve_sub_menus(parent, info, **input):
    return SideBarMenuModel.objects(group=parent.name).all().order_by("+sort_order")