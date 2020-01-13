import { RESOURCE } from '../const';

export default {
  path: '/creative',
  name: 'creative.index',
  component: () => import('@/views/Creative/Index.vue'),
  children: [
    {
      path: 'catalog',
      component: () => import('@/views/Creative/Catalog/Index.vue'),
      name: 'creative.catalog',
      redirect: '/creative/catalog/releases',
      children: [
        {
          path: '',
          redirect: 'releases',
        },
        {
          path: 'releases',
          component: () => import('@/views/Creative/Catalog/Releases/Index.vue'),
          name: 'creative.catalog.releases',
          meta: {
            auth: true,
            resource: RESOURCE.creative.nested.catalog,
          },
        },
        {
          path: 'artists',
          component: () => import('@/views/Creative/Catalog/Artists/Index.vue'),
          name: 'creative.catalog.artists',
        },
      ],
    },
    {
      path: 'project',
      component: () => import('@/views/Creative/Projects/Index.vue'),
      name: 'creative.project',
    },
    {
      path: 'project-schedule',
      component: () => import('@/views/Creative/ProjectsShedule/Index.vue'),
      name: 'creative.projects-schedule',
    },
    {
      path: 'demobox',
      component: () => import('@/views/Creative/Demobox/Index.vue'),
      name: 'creative.demobox',
      // redirect: '/creative/demobox/primary',
      children: [
        {
          path: '',
          redirect: 'primary',
        },
        {
          path: 'primary',
          component: () => import('@/views/Creative/Demobox/Primary/Index.vue'),
          name: 'creative.demobox.primary',
          meta: {
            auth: true,
            resource: RESOURCE.creative.nested.primary,
          },
        },
        {
          path: 'secondary',
          component: () => import('@/views/Creative/Demobox/Secondary/Index.vue'),
          name: 'creative.demobox.secondary',
          meta: {
            auth: true,
            resource: RESOURCE.creative.nested.primary,
          },
        },
        {
          path: 'sign/:identifier',
          component: () => import('@/views/Creative/Demobox/Sign/Index.vue'),
          name: 'creative.demobox.sign',
        },
      ],
    },
    {
      path: 'toplines',
      component: () => import('@/views/Creative/Toplines/Index.vue'),
      name: 'creative.toplines',
    },
  ],
  // If the user needs to be authenticated to view this page.
  meta: {
    auth: true,
    resource: RESOURCE.creative.main,
  },
};
