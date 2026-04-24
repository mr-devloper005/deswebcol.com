import type { SiteRecipe } from '@/design/factory/recipe-types'

export const SITE_RECIPE: SiteRecipe = {
  productFamily: 'directory',
  themePack: 'yelp-local',
  homepageTemplate: 'listing-home',
  navbarTemplate: 'compact-bar',
  footerTemplate: 'columns-footer',
  motionPack: 'utility-snappy',
  primaryTask: 'listing',
  enabledTasks: ['listing', 'classified'],
  taskTemplates: { listing: 'listing-directory', classified: 'classified-market' },
  manualOverrides: {
    navbar: false,
    footer: false,
    homePage: false,
    taskListPage: false,
    taskDetailPage: false,
    taskCard: false,
    contactPage: false,
    loginPage: false,
    registerPage: false,
  },
}
