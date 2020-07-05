import graphene
from graphene_mongo import MongoengineConnectionField

from ..models import SideBarMenuModel
from ..types import SideBarMenuType

class SideBarMenuQuery(graphene.ObjectType):
  class Meta:
    abstract = True

  sidebar_menus = graphene.List(SideBarMenuType)

  @classmethod
  def resolve_sidebar_menus(cls, root, info):
    return SideBarMenuModel.objects(usable=True).all().order_by("+sort_order")

    