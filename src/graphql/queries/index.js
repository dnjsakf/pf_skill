import gql from 'graphql-tag';

export default {
  GET_SIDE_BAR_MENUS: gql(`
    query getSideBarMenus{
      sideBarMenus{
        title
        href
        icon
      }
    }
  `),
}