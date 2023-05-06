import { createRouter, createWebHistory } from 'vue-router'
import { RouteName } from '@/router/route-names'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteName.DASHBOARD,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/DashboardView.vue'),
    },
    {
      /**
       * - Type required for table selection
       * - Relation needed for table selection when NOT Logs or Settings
       */
      path: '/data/:type/:relation?',
      name: RouteName.DATA,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/DataView.vue'),
    },
    {
      /**
       * - Type required for creation
       * - Relation required for creation
       * - Id needed if creating child of parent
       */
      path: '/create/:type/:relation/:id?',
      name: RouteName.CREATE,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/CreateView.vue'),
    },
    {
      path: '/inspect/:id/:timestamp',
      name: RouteName.INSPECT,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/InspectView.vue'),
    },
    {
      path: '/edit/:id/:timestamp',
      name: RouteName.EDIT,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/EditView.vue'),
    },
    {
      path: '/charts/:id/:timestamp',
      name: RouteName.CHARTS,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/ChartsView.vue'),
    },
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

export default router
