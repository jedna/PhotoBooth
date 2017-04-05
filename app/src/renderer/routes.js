export default [
    {
        path     : '/landing-page',
        name     : 'landing-page',
        component: require('components/LandingPageView')
    },
    {
        path     : '/editor/:photo_id',
        name     : 'editor',
        component: require('components/EditorView')
    },
    {
        path     : '/browser',
        name     : 'browser',
        component: require('components/BrowserView')
    },
    {
        path     : '/browser/:photo_id',
        name     : 'browser-selected',
        props    : true,
        component: require('components/BrowserView')
    },
    {
        path    : '*',
        redirect: '/browser'
    }
]
