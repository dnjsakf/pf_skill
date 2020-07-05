# api/models.py
import graphene
from graphene.relay import Node
from graphene_mongo import MongoengineObjectType

from ..models import SideBarMenuModel

class SideBarMenuType(MongoengineObjectType):
  class Meta:
    model = SideBarMenuModel
    interfaces = (Node, )