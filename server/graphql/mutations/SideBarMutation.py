import graphene

from ..models import  SideBarMenuModel
from ..types import  SideBarMenuType, SideBarSubMenuType

class CreateSideBarMenu(graphene.Mutation):
  class Arguments:
    group = graphene.String()
    name = graphene.String(required=True)
    href = graphene.String(required=True)
    icon = graphene.String()
    
    sort_order = graphene.Int()
    usable = graphene.Boolean()

  success = graphene.Boolean()

  def mutate(root, info, **input):
    side_bar_model = SideBarMenuModel(
      group= None if input.get("group") == "" else input.get("group"),
      name=input.get("name"),
      href=input.get("href"),
      icon=input.get("icon"),
      sort_order=input.get("sort_order"),
      usable=input.get("usable", True)
    ).save()

    return CreateSideBarMenu(
      success=True
    )