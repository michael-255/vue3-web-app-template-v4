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
      path: '/logs-data',
      name: RouteName.DATA_LOGS,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/DataLogsView.vue'),
    },
    {
      path: '/settings-data',
      name: RouteName.DATA_SETTINGS,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/DataSettingsView.vue'),
    },
    {
      path: '/parent-data/:type',
      name: RouteName.DATA_PARENTS,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/DataView.vue'), // TODO - DataParentView
    },
    {
      path: '/child-data/:type',
      name: RouteName.DATA_CHILDREN,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/DataView.vue'), // TODO - DataChildView
    },
    {
      path: '/create-parent/:type',
      name: RouteName.CREATE_PARENT,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/CreateView.vue'), // TODO - CreateParentView
    },
    {
      path: '/create-child/:type/:parentId?',
      name: RouteName.CREATE_CHILD,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/CreateView.vue'), // TODO - CreateChildView
    },
    {
      path: '/edit-parent/:type/:id',
      name: RouteName.EDIT_PARENT,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/EditView.vue'), // TODO - EditParentView
    },
    {
      path: '/edit-child/:type/:id',
      name: RouteName.EDIT_CHILD,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/EditView.vue'), // TODO - EditChildView
    },
    {
      path: '/inspect-parent/:type/:id',
      name: RouteName.INSPECT_PARENT,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/InspectView.vue'), // TODO - InspectParentView
    },
    {
      path: '/inspect-child/:type/:id',
      name: RouteName.INSPECT_CHILD,
      meta: { layout: 'MenuLayout' },
      component: () => import('../views/InspectView.vue'), // TODO - InspectChildView
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
