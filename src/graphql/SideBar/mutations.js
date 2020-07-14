import gql from 'graphql-tag';

export const CREATE_SIDE_BAR_MENU = gql(`
  mutation (
    $group: String,
    $name: String!,
    $href: String!,
    $icon: String,
    $sortOrder: Int
  ) {
    createSideBarMenu(
      group: $group,
      name: $name,
      href: $href,
      icon: $icon,
      sortOrder: $sortOrder
    ) {
      success
    }
  }
`);