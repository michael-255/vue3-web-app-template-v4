import { createRouter, createWebHistory } from 'vue-router'
import { RouteName } from '@/router/route-names'
// import { getAllCategoryTypes, getSupportedActions, getTypeFromSlug } from '@/services/Blueprints'
// import { DatabaseAction, type DatabaseType } from '@/types/database'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteName.DASHBOARD,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/DashboardView.vue'),
    },
    // {
    //   path: '/data/:databaseTypeSlug',
    //   name: RouteName.DATA,
    //   meta: { layout: 'MenuLayout' },
    //   component: () => import('../views/DataView.vue'),
    //   beforeEnter(to, from, next) {
    //     const databaseType = getTypeFromSlug(to?.params?.databaseTypeSlug as string)

    //     if (isDatabaseTypeValid(databaseType)) {
    //       next()
    //     } else {
    //       next('/404')
    //     }
    //   },
    // },
    // {
    //   path: '/inspect/:databaseTypeSlug/:id',
    //   name: RouteName.ACTION_INSPECT,
    //   meta: { layout: 'MenuLayout' },
    //   component: () => import('../views/ActionInspectView.vue'),
    //   beforeEnter(to, from, next) {
    //     const databaseType = getTypeFromSlug(to?.params?.databaseTypeSlug as string)

    //     if (
    //       isTypeActionSupported(DatabaseAction.INSPECT, databaseType) &&
    //       isDatabaseTypeValid(databaseType) &&
    //       isIdValid(to?.params?.id as string)
    //     ) {
    //       next()
    //     } else {
    //       next('/404')
    //     }
    //   },
    // },
    // {
    //   // parentId is optional for creating child records with a specific parent id
    //   path: '/create/:databaseTypeSlug/:parentId?',
    //   name: RouteName.ACTION_CREATE,
    //   meta: { layout: 'MenuLayout' },
    //   component: () => import('../views/ActionCreateView.vue'),
    //   beforeEnter(to, from, next) {
    //     const databaseType = getTypeFromSlug(to?.params?.databaseTypeSlug as string)

    //     if (
    //       isTypeActionSupported(DatabaseAction.CREATE, databaseType) &&
    //       isDatabaseTypeValid(databaseType)
    //     ) {
    //       next()
    //     } else {
    //       next('/404')
    //     }
    //   },
    // },
    // {
    //   path: '/edit/:databaseTypeSlug/:id',
    //   name: RouteName.ACTION_EDIT,
    //   meta: { layout: 'MenuLayout' },
    //   component: () => import('../views/ActionEditView.vue'),
    //   beforeEnter(to, from, next) {
    //     const databaseType = getTypeFromSlug(to?.params?.databaseTypeSlug as string)

    //     if (
    //       isTypeActionSupported(DatabaseAction.EDIT, databaseType) &&
    //       isDatabaseTypeValid(databaseType) &&
    //       isIdValid(to?.params?.id as string)
    //     ) {
    //       next()
    //     } else {
    //       next('/404')
    //     }
    //   },
    // },
    // {
    //   path: '/charts/:databaseTypeSlug/:id',
    //   name: RouteName.ACTION_CHARTS,
    //   meta: { layout: 'MenuLayout' },
    //   component: () => import('../views/ActionChartsView.vue'),
    //   beforeEnter(to, from, next) {
    //     const databaseType = getTypeFromSlug(to?.params?.databaseTypeSlug as string)

    //     if (
    //       isTypeActionSupported(DatabaseAction.CHARTS, databaseType) &&
    //       isDatabaseTypeValid(databaseType) &&
    //       isIdValid(to?.params?.id as string)
    //     ) {
    //       next()
    //     } else {
    //       next('/404')
    //     }
    //   },
    // },
    {
      path: '/settings',
      name: RouteName.SETTINGS,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/SettingsView.vue'),
    },
    {
      path: '/faq',
      name: RouteName.FAQ,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/FAQView.vue'),
    },
    {
      path: '/about',
      name: RouteName.ABOUT,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/donate',
      name: RouteName.DONATE,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/DonateView.vue'),
    },
    {
      path: '/:pathMatch(.*)*', // 404 Not Found
      name: RouteName.NOT_FOUND,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

/**
//  * Checks if the database type is valid.
//  * @param type
//  */
// function isDatabaseTypeValid(type?: DatabaseType) {
//   if (type) {
//     return getAllCategoryTypes().includes(type)
//   } else {
//     return false
//   }
// }

// /**
//  * Checks if the database type supports the action that is being requested.
//  * @param action
//  * @param type
//  */
// function isTypeActionSupported(action: DatabaseAction, type?: DatabaseType) {
//   if (type) {
//     return getSupportedActions(type).includes(action)
//   } else {
//     return false
//   }
// }

// /**
//  * Checks if the id exists with at least a length of 1.
//  * @param id
//  */
// function isIdValid(id: string) {
//   return !!(id?.length > 0)
// }

export default router
