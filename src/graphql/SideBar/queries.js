import gql from 'graphql-tag';

export const GET_SIDE_BAR_MENUS = gql(`
  query getSideBarMenus{
    sideBarMenus {
      title
      href
      icon
      subMenus {
        title
        href
        icon
      }
    }
  }
`);