import { ReactElement } from 'react';
import {
    ActivitySvgComponent,
    ProfileSvgComponent,
    SignOutSvgComponent
} from 'components/icons';

interface SideMenu {
    name: string;
    icon: ReactElement;
    isOpened?: boolean;
    isLogOut?: boolean;
    route?: string;
}

export const sideMenu: SideMenu[] = [
    {
        name: 'Home',
        isOpened: false,
        icon: <ProfileSvgComponent />,
        route: '/'
    },
    {
        name: 'Services',
        isOpened: false,
        icon: <ProfileSvgComponent />,
        route: '/services'
    },
    {
        name: 'Blog',
        isOpened: false,
        icon: <ActivitySvgComponent />,
        route: '/blog'
    },
    {
        name: 'Consult us',
        isOpened: false,
        icon: <ActivitySvgComponent />,
        route: '/consult-us'
    },
    {
        name: 'Register',
        isOpened: false,
        icon: <ActivitySvgComponent />,
        route: '/signup'
    }
];

export const privateMenu: SideMenu[] = [
    {
        name: 'Dashboard',
        isOpened: false,
        icon: <ProfileSvgComponent />,
        route: '/dashboard'
    },
    {
        name: 'Profile',
        isOpened: false,
        icon: <ProfileSvgComponent />,
        route: '/profile'
    },
    {
        name: 'Logout',
        isOpened: false,
        isLogOut: true,
        icon: <SignOutSvgComponent />
    }
];

export const deskTopNavItems = [
    {
        name: 'About',
        route: '/about'
    },
    {
        name: 'Support',
        route: '/support'
    },
    {
        name: 'Blog',
        route: '/blog'
    },
    {
        name: 'Services',
        route: '/services'
    }
];
