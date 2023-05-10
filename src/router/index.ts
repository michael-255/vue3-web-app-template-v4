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
      path: '/data/:type',
      name: RouteName.DATA,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/DataView.vue'),
    },
    {
      /**
       * Parent Id required for child of parent creation
       */
      path: '/create/:type/:parentId?',
      name: RouteName.CREATE,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/CreateView.vue'),
    },
    {
      path: '/inspect/:type/:id',
      name: RouteName.INSPECT,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/InspectView.vue'),
    },
    {
      path: '/edit/:type/:id',
      name: RouteName.EDIT,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/EditView.vue'),
    },
    {
      path: '/charts/:type/:id',
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
