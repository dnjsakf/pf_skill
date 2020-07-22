import { GET_MENU_LIST } from './queries';
import { CREATE_MENU, UPDATE_MENU, DELETE_MENU } from './mutations';


const GET_MENU_LIST_MOCKS = [
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
]

const CREATE_MENU_MOCK_VARS = {
  sample: {
    group: "Settings",
    name: "Mocked",
    label: "Mocked",
    href: "/settings/mocked",
    icon: "Settings",
  }
}
const CREATE_MENU_MOCKS = [
  {
    request: {
      query: CREATE_MENU,
      variables: CREATE_MENU_MOCK_VARS.sample,
    },
    result: {
      data: {
        createMenu: {
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
  },
];

const UPDATE_MENU_MOCK_VARS = {
  sample: {
    group: "",
    name: "Home",
    label: "Home",
    href: "/home",
    icon: "Image",
  }
}
const UPDATE_MENU_MOCKS = [
  {
    request: {
      query: UPDATE_MENU,
      variables: UPDATE_MENU_MOCK_VARS.sample,
    },
    result: {
      data: {
        updateMenu: {
          success: true,
          menu: UPDATE_MENU_MOCK_VARS.sample,
        },
      }
    }
  },
];

const DELETE_MENU_MOCK_VARS = {
  sample: {
    group: "",
    name: "Home",
  }
}
const DELETE_MENU_MOCKS = [
  {
    request: {
      query: DELETE_MENU,
      variables: DELETE_MENU_MOCK_VARS.smaple,
    },
    result: {
      data: {
        deleteMenu: {
          success: true,
          delcount: 1
        },
      }
    }
  },
];

/*
export default [].concat(
  GET_MENU_LIST_MOCKS,
  CREATE_MENU_MOCKS,
  UPDATE_MENU_MOCKS,
  DELETE_MENU_MOCK_VARS
)
*/

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
      variables: CREATE_MENU_MOCK_VARS.sample,
    },
    result: {
      data: {
        createMenu: {
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
  },
  {
    request: {
      query: UPDATE_MENU,
      variables: UPDATE_MENU_MOCK_VARS.sample,
    },
    result: {
      data: {
        updateMenu: {
          success: true,
          menu: UPDATE_MENU_MOCK_VARS.sample,
        },
      }
    }
  },
  {
    request: {
      query: DELETE_MENU,
      variables: DELETE_MENU_MOCK_VARS.smaple,
    },
    result: {
      data: {
        deleteMenu: {
          success: true,
          delcount: 1
        },
      }
    }
  }
]