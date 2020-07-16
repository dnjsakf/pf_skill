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
            _id: "1",
            group: "",
            name: "Home",
            label: "홈",
            href: "/home",
            icon: "Image",
            subMenus: []
          },
          {
            _id: "2",
            group: "",
            name: "Skills",
            label: "기술 스택",
            href: "/skills",
            icon: "Code",
            subMenus: [
              {
                _id: "1",
                group: "Skills",
                name: "ELK",
                label: "ELK 스택",
                href: "/skills/elk",
                icon: "Code"
              },
              {
                _id: "2",
                group: "Skills",
                name: "ETL",
                label: "ETL",
                href: "/skills/etl",
                icon: "Code" 
              },
              {
                _id: "3",
                group: "Skills",
                name: "Crawler",
                label: "크롤링",
                href: "/skills/crawler",
                icon: "Code" 
              },
              {
                _id: "4",
                group: "Skills",
                name: "CELERY",
                label: "CELERY",
                href: "/skills/celery",
                icon: "Code"
              },
            ]
          },
          {
            _id: "3",
            group: "",
            name: "Settings",
            label: "설정",
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
      },
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