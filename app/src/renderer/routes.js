export default [
  {
    path: '/',
    name: 'landing-page',
    component: require('components/LandingPageView')
  },
  {
    path: '/editor/:photo_id',
    name: 'editor',
    component: require('components/EditorView')
  },
  {
    path: '*',
    redirect: '/'
  }
]
