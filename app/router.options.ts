import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // Opening or closing a project (?project=slug) must keep the page where it is
    const onlyProjectChanged = to.path === from.path && to.query.project !== from.query.project
    if (onlyProjectChanged) {
      return false
    }

    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return { el: to.hash }
    }

    return { top: 0 }
  }
}
