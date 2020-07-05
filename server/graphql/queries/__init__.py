# api/query.pyf
from graphene.relay import Node
from .SideBarQuery import SideBarMenuQuery

Inherits = [
  SideBarMenuQuery
]

class Query(*Inherits):
  # node = Node.Field()
  pass