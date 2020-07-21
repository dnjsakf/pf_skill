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

  def mutate(root, info, name, label, href, **input):
    group = None if input.get("group") == "" else input.get("group", None)

    menu_model = MenuModel(
      group=group,
      name=name,
      label=label,
      href=href,
      icon=input.get("icon", None),
      sort_order=input.get("sort_order", 0),
      usable=input.get("usable", True)
    ).save()

    return CreateMenu(
      menu=menu_model,
      success=bool(menu_model)
    )

class UpdateMenu(graphene.Mutation):
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

  def mutate(root, info, name=None, label=None, href=None, **input):
    group = None if input.get("group") == "" else input.get("group", None)

    menu_model = MenuModel.objects(group=group, name=name).modify(
      new=True,
      set__label=label,
      set__href=href,
      set__icon=input.get("icon", None),
      set__sort_order=input.get("sort_order", 0),
      set__usable=input.get("usable", True)
    )

    return UpdateMenu(
      menu=menu_model,
      success=bool(menu_model)
    )

class DeleteMenu(graphene.Mutation):
  class Arguments:
    group = graphene.String()
    name = graphene.String(required=True)

  delcount = graphene.Int()
  success = graphene.Boolean()

  def mutate(root, info, name=None, **input):
    group = None if input.get("group") == "" else input.get("group", None)

    delcount = MenuModel.objects(group=group, name=name).delete()

    return DeleteMenu(
      delcount=delcount,
      success=bool(delcount)
    )