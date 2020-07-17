import graphene

from .MenuMutation import (
  CreateMenu
)

class Mutation(graphene.ObjectType):
  create_menu = CreateMenu.Field()