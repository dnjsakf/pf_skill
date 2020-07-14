import gql from 'graphql-tag';

export const GET_SIDE_BAR_MENUS = gql(`
  query getSideBarMenus{
    sideBarMenus {
      name
      href
      icon
      subMenus {
        name
        href
        icon
      }
    }
  }
`);