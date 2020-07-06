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

export const mocks = [
  {
    request: {
      query: GET_SIDE_BAR_MENUS,
    },
    result: {
      data: {
        sideBarMenus: [
          {
            title: "Home",
            href: "/home",
            icon: "Image"
          },
          {
            title: "기술 스택",
            href: "/skill-stack",
            icon: "Image"
          },
          {
            title: "Settings",
            href: "/settings",
            icon: "Settings"
          }
        ]
      }
    }
  }
]