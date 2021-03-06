interface RouteConfig {
    name: string;
    path: string;
    isPrivate?: boolean;
}

export const routes: RouteConfig[] = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Home',
        path: '/home'
    },
    {
        name: 'UserDashboard',
        path: '/dashboard',
        isPrivate: true
    },
    {
        name: 'login',
        path: '/login'
    },
    {
        name: 'profile',
        path: '/account'
    }
];

export const routePaths = routes.map(route => route.path);

export const getRoutePathIndex = (path: string) => {
    const index = routePaths.indexOf(path);
    return index > -1 ? index : 0;
};
