# api/schema.py
import graphene

from .queries import Query
from .mutations import Mutation
from .types import *

# Schema 생성
schema = graphene.Schema(
  query=Query,
  # mutation=Mutation,
  types=[
    SideBarMenuType,
  ],
  auto_camelcase=True
)