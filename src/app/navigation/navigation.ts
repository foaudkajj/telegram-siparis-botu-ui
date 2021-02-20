import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'botmanagement',
        title: 'Bot Management',
        translate: 'NAV.BOT_MANAGEMENT',
        type: 'collapsable',
        children: [
            {
                id: 'categories',
                title: 'Categories',
                translate: 'NAV.CATEGORIES',
                type: 'item',
                icon: 'fastfood',
                url: '/sample'
            }
        ]
    }
];
