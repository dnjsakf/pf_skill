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
    createMenu (
      group: $group,
      name: $name,
      label: $label,
      href: $href,
      icon: $icon,
      sortOrder: $sortOrder
    ) {
      menu {
        group
        name
        label
        href
        icon
        sortOrder
      }
      success
    }
  }
`);

export const UPDATE_MENU = gql(`
  mutation updateMenu(
    $group: String,
    $name: String!,
    $label: String!,
    $href: String!,
    $icon: String,
    $sortOrder: Int
  ) {
    updateMenu(
      group: $group,
      name: $name,
      label:$label,
      href: $href,
      icon: $icon,
      sortOrder: $sortOrder
    ) {
      menu {
        group
        name
        label
        href
        icon
      }
      success
    }
  }
`);

export const DELETE_MENU = gql(`
  mutation deleteMenu(
    $group: String,
    $name: String!
  ) {
    deleteMenu(
      group: $group,
      name: $name
    ) {
      delcount
      success
    }
  }
`);