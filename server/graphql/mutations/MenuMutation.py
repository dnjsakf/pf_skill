import graphene

from ..models import  MenuModel
from ..types import  MenuType

class CreateMenu(graphene.Mutation):
  class Arguments:
    group = graphene.String()
    name = graphene.String(required=True)
    label = graphene.String(required=True)
    href = graphene.String(required=True)
    icon = graphene.String()
    
    sort_order = graphene.Int()
    usable = graphene.Boolean()

  menu = graphene.Field( MenuType )
  success = graphene.Boolean()

  def mutate(root, info, **input):
    menu_model = MenuModel(
      group= None if input.get("group") == "" else input.get("group"),
      name=input.get("name"),
      label=input.get("label"),
      href=input.get("href"),
      icon=input.get("icon"),
      sort_order=input.get("sort_order"),
      usable=input.get("usable", True)
    ).save()

    return CreateSideBarMenu(
      menu=menu_model,
      success=True
    )