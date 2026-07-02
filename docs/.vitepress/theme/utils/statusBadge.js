export function statusBadgeClass(status) {
  switch (status?.toLowerCase()) {
    case 'finished':
      return 'badge-completed'
    case 'on hold':
      return 'badge-on-hold'
    case 'active':
    case 'active development':
      return 'badge-active-development'
    case 'prototype':
      return 'badge-prototype'
    default:
      return 'badge-default'
  }
}
