export default [
    {
        path     : '/landing-page',
        name     : 'landing-page',
        component: require('components/LandingPageView')
    },
    {
        path     : '/editor/:path',
        name     : 'editor',
        props    : true,
        component: require('components/EditorView')
    },
    {
        path     : '/browser',
        name     : 'browser',
        component: require('components/BrowserView')
    },
    {
        path     : '/browser/:path',
        name     : 'browser-selected',
        props    : true,
        component: require('components/BrowserView')
    },
    {
        path     : '/settings',
        name     : 'settings',
        component: require('components/SettingsView')
    },
    {
        path    : '*',
        redirect: '/browser'
    }
]
