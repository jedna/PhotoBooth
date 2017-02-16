export default [
  {
    path: '/',
    name: 'landing-page',
    component: require('components/LandingPageView')
  },
  {
    path: '/editor',
    name: 'editor',
    component: require('components/EditorView')
  },
  {
    path: '*',
    redirect: '/'
  }
]
