import { createRouter, createWebHistory } from 'vue-router'
import { routeNames } from '@/types/general'
import { idSchema, recordGroups, recordTypes } from '@/types/core'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: routeNames.Values.Dashboard,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/DashboardView.vue'),
    },
    {
      path: '/logs-data',
      name: routeNames.Values.DataLogs,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/DataLogsView.vue'),
    },
    {
      path: '/records-data/:group/:type',
      name: routeNames.Values.DataRecords,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/DataRecordsView.vue'),
      beforeEnter: (to, _, next) => {
        if (
          recordGroups.safeParse(to.params.group).success &&
          recordTypes.safeParse(to.params.type).success
        ) {
          next()
        } else {
          next({ name: routeNames.Values.NotFound })
        }
      },
    },
    {
      path: '/create/:group/:type/:coreId?',
      name: routeNames.Values.Create,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/CreateView.vue'),
      beforeEnter: (to, _, next) => {
        if (
          recordGroups.safeParse(to.params.group).success &&
          recordTypes.safeParse(to.params.type).success
        ) {
          next()
        } else {
          next({ name: routeNames.Values.NotFound })
        }
      },
    },
    {
      path: '/edit/:group/:type/:id',
      name: routeNames.Values.Edit,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/EditView.vue'),
      beforeEnter: (to, _, next) => {
        if (
          recordGroups.safeParse(to.params.group).success &&
          recordTypes.safeParse(to.params.type).success &&
          idSchema.safeParse(to.params.id).success
        ) {
          next()
        } else {
          next({ name: routeNames.Values.NotFound })
        }
      },
    },

    {
      path: '/settings',
      name: routeNames.Values.Settings,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/SettingsView.vue'),
    },
    {
      path: '/faq',
      name: routeNames.Values.FAQ,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/FAQView.vue'),
    },
    {
      path: '/about',
      name: routeNames.Values.About,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/donate',
      name: routeNames.Values.Donate,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/DonateView.vue'),
    },
    {
      path: '/:pathMatch(.*)*', // 404 Not Found
      name: routeNames.Values.NotFound,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
