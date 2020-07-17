# api/query.pyf
from graphene.relay import Node
from .MenuQuery import MenuListQuery

Inherits = [
  MenuListQuery
]

class Query(*Inherits):
  # node = Node.Field()
  pass