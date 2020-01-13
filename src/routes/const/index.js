export const FINANCE_DASHBOARD = 'finance.dashboard';
export const ADMIN_MAIN_PAGE = 'creative.catalog.releases';
export const BACKOFFICE_MAIN_PAGE = 'backoffice.metadata';
export const CREATIVE_MAIN_PAGE = 'creative.catalog.releases';
export const DEMOBOX_MAIN_PAGE = 'creative.demobox.primary';

export const RESOURCE = {
  creative: {
    main: 'creative',
    nested: {
      catalog: 'creative.catalog.releases',
      artists: 'creative.catalog.artists',
      primary: 'creative.demobox.primary',
      secondary: 'creative.demobox.secondary',
      projects: 'creative.project',
      projectSchedule: 'creative.projects-schedule',
      toplines: 'creative.toplines',
    },
  },
  backoffice: {
    main: 'backoffice',
    nested: {
      metadata: 'backoffice.metadata',
      release_schedule: 'backoffice.releaseschedule',
    },
  },
  account: { main: 'account' },
  finance: { main: 'finance' },
};
