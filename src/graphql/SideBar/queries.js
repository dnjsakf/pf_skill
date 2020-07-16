import gql from 'graphql-tag';

export const GET_SIDE_BAR_MENUS = gql(`
  query getSideBarMenus{
    sideBarMenus {
      _id
      group
      name
      label
      href
      icon
      subMenus {
        _id
        group
        name
        label
        href
        icon
      }
    }
  }
`);