import gql from 'graphql-tag';

export const CREATE_MENU = gql(`
  mutation createMenu (
    $group: String,
    $name: String!,
    $label: String!,
    $href: String!,
    $icon: String,
    $sortOrder: Int
  ) {
    createSideBarMenu (
      group: $group,
      name: $name,
      label: $label,
      href: $href,
      icon: $icon,
      sortOrder: $sortOrder
    ) {
      success
      menu
    }
  }
`);