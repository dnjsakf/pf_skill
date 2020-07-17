import gql from 'graphql-tag';

export const GET_MENU_LIST = gql(`
  query getMenuList{
    items: menuList {
      id
      group
      name
      label
      href
      icon
      subItems: subMenuList {
        id
        group
        name
        label
        href
        icon
      }
    }
  }
`);