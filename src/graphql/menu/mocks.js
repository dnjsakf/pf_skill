import { GET_MENU_LIST } from './queries';
import { CREATE_MENU } from './mutations';

export default [
  {
    request: {
      query: GET_MENU_LIST,
    },
    result: {
      data: {
        items: [
          {
            id: "Home",
            group: "",
            name: "Home",
            label: "홈",
            href: "/home",
            icon: "Image",
            subItems: []
          },
          {
            id: "Skills",
            group: "",
            name: "Skills",
            label: "기술 스택",
            href: "",
            icon: "Code",
            subItems: [
              {
                id: "Skills/ELK",
                group: "Skills",
                name: "ELK",
                label: "ELK 스택",
                href: "/skills/elk",
                icon: "Code"
              },
              {
                id: "Skills/ETL",
                group: "Skills",
                name: "ETL",
                label: "ETL",
                href: "/skills/etl",
                icon: "Code" 
              },
              {
                id: "Skills/Crawler",
                group: "Skills",
                name: "Crawler",
                label: "크롤링",
                href: "/skills/crawler",
                icon: "Code" 
              },
              {
                id: "Skills/CELERY",
                group: "Skills",
                name: "CELERY",
                label: "CELERY",
                href: "/skills/celery",
                icon: "Code"
              },
            ]
          },
          {
            id: "Settings",
            group: "",
            name: "Settings",
            label: "설정",
            href: "/settings",
            icon: "Settings",
            subItems: []
          }
        ]
      }
    }
  },
  {
    request: {
      query: CREATE_MENU,
      variables: {
        group: "Settings",
        name: "Mocked",
        label: "Mocked",
        href: "/settings/mocked",
        icon: "Settings",
      },
    },
    result: {
      data: {
        createSideBarMenu: {
          success: true,
          menu: {
            group: "Settings",
            name: "Mocked",
            label: "Mocked",
            href: "/settings/mocked",
            icon: "Settings",
          },
        },
      }
    }
  }
]