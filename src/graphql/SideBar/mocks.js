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