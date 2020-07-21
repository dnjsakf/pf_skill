import graphene

from .MenuMutation import (
  CreateMenu,
  UpdateMenu,
  DeleteMenu
)

class Mutation(graphene.ObjectType):
  create_menu = CreateMenu.Field()
  update_menu = UpdateMenu.Field()
  delete_menu = DeleteMenu.Field()