import { ReactElement } from 'react';
import { ActivitySvgComponent, ProfileSvgComponent, SignOutSvgComponent } from 'components/icons';

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
        route: '/account'
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

export interface Currency {
    code: string;
    flag: string;
    name: string;
    symbol: string;
    isComingSoon?: boolean;
}

export const foreignCurrencies: Currency[] = [
    {
        code: 'EUR',
        flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EU.svg',
        name: 'Euro',
        symbol: '€'
    },
    {
        code: 'USD',
        flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/US.svg',
        name: 'US Dollars',
        symbol: '$'
    },
    {
        code: 'GBP',
        flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GB.svg',
        name: 'British Pounds',
        symbol: '£'
    },
    {
        code: 'CAD',
        flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CA.svg',
        name: 'Canadian Dollars',
        symbol: '$'
    }
];

export const africanCurrencies: Currency[] = [
    {
        code: 'NGN',
        flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NG.svg',
        name: 'Nigerian Naira',
        symbol: '₦'
    },
    {
        code: 'GHC',
        flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GH.svg',
        name: 'Ghanian Cedis',
        symbol: 'GH₵',
        isComingSoon: true
    },
    {
        code: 'KES',
        flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KE.svg',
        name: 'Kenyan Shillings ',
        symbol: 'Ksh',
        isComingSoon: true
    },
    {
        code: 'XAF',
        flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CM.svg',
        name: 'Central African CFA franc',
        symbol: 'XAF',
        isComingSoon: true
    }
];
