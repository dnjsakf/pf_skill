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
            icon: "Image",
            subMenus: []
          },
          {
            title: "기술 스택",
            href: "/skills",
            icon: "Code",
            subMenus: [
              {
                title: "ELK",
                href: "/skills/elk",
                icon: "Code"
              },
              {
                title: "ETL",
                href: "/skills/etl",
                icon: "Code" 
              },
              {
                title: "Crawler",
                href: "/skills/crawler",
                icon: "Code" 
              },
              {
                title: "CELERY",
                href: "/skills/celery",
                icon: "Code" 
              },
            ]
          },
          {
            title: "Settings",
            href: "/settings",
            icon: "Settings",
            subMenus: []
          }
        ]
      }
    }
  }
]