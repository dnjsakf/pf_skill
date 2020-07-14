import { GET_SIDE_BAR_MENUS } from './queries';

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
  }
]