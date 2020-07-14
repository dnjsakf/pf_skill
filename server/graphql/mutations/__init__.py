import graphene

from .SideBarMutation import (
  CreateSideBarMenu
)

class Mutation(graphene.ObjectType):
  create_side_bar_menu = CreateSideBarMenu.Field()