import { GET_SIDE_BAR_MENUS } from './queries';
import { CREATE_SIDE_BAR_MENU } from './mutations';

export default [
  {
    request: {
      query: GET_SIDE_BAR_MENUS,
    },
    result: {
      data: {
        sideBarMenus: [
          {
            name: "Home",
            href: "/home",
            icon: "Image",
            subMenus: []
          },
          {
            name: "기술 스택",
            href: "/skills",
            icon: "Code",
            subMenus: [
              {
                name: "ELK",
                href: "/skills/elk",
                icon: "Code"
              },
              {
                name: "ETL",
                href: "/skills/etl",
                icon: "Code" 
              },
              {
                name: "Crawler",
                href: "/skills/crawler",
                icon: "Code" 
              },
              {
                name: "CELERY",
                href: "/skills/celery",
                icon: "Code" 
              },
            ]
          },
          {
            name: "Settings",
            href: "/settings",
            icon: "Settings",
            subMenus: []
          }
        ]
      }
    }
  },
  {
    request: {
      query: CREATE_SIDE_BAR_MENU,
      variables: {
        group: "Settings",
        name: "Mocked",
        href: "/settings",
        icon: "Settings",
      }
    },
    result: {
      data: {
        createSideBarMenu: {
          success: true,
        },
      }
    }
  }
]