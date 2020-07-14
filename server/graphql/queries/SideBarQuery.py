import graphene
from graphene_mongo import MongoengineConnectionField

from ..models import SideBarMenuModel
from ..types import SideBarMenuType

class SideBarMenuQuery(graphene.ObjectType):
  class Meta:
    abstract = True

  side_bar_menus = graphene.List(SideBarMenuType)

  @classmethod
  def resolve_side_bar_menus(cls, root, info):
    return SideBarMenuModel.objects(group=None, usable=True).all().order_by("+sort_order")

    