export const routes = [
    {
        test: /^\#\/react-app-1($|[?/])/,
        loader: () => import(/* webpackChunkName: "react-app-1" */ 'react-app-1'),
        template: '<react-app-1></react-app-1>',
    },
    {
        test: /^\#\/react-app-2($|[?/])/,
        loader: () => import(/* webpackChunkName: "react-app-2" */ 'react-app-2'),
        template: '<react-app-2></react-app-2>',
    },
    {
        test: /^\#\/angularjs-app-1($|[?/])/,
        loader: () => import(/* webpackChunkName: "angularjs-app-1" */ 'angularjs-app-1'),
        template: '<angularjs-app-1></angularjs-app-1>',
    },
    {
        test: /^\#\/angularjs-app-2($|[?/])/,
        loader: () => import(/* webpackChunkName: "angularjs-app-2" */ 'angularjs-app-2'),
        template: '<angularjs-app-2></angularjs-app-2>',
    },
    {
        test: /^\#\/angularjs-app-1and2($|[?/])/,
        loader: () => Promise.all([
            import(/* webpackChunkName: "angularjs-app-1" */ 'angularjs-app-1'),
            import(/* webpackChunkName: "angularjs-app-2" */ 'angularjs-app-2'),
        ]),
        template: '<angularjs-app-1></angularjs-app-1><angularjs-app-2></angularjs-app-2>',
    },
    {
        test: /^\#\/vue-app-1($|[?/])/,
        loader: () => import(/* webpackChunkName: "vue-app-1" */ 'vue-app-1'),
        template: '<vue-app-1></vue-app-1>',
    },
];