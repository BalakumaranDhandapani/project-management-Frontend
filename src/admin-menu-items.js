export default {
    items: [
        {
            id: '0',
            title: 'DASHBOARD',
            type: 'group',
            icon: 'feather icon-grid',
            defaultscreen: 1,
            url: '/Dashboard',
            children: [
                {
                    id: 'DASHBOARD',
                    title: 'DASHBOARD',
                    type: 'item',
                    url: '/Dashboard',
                    icon: 'feather icon-grid',
                }
            ]
        },
        {
            id: '2',
            title: 'StockIn',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'StockIn',
                    title: 'PROJECT MANAGEMENT',
                    type: 'item',
                    url: '/PROJECT_MANAGEMENT',
                    icon: 'feather icon-layers',
                }
            ]
        },
        {
            id: '1',
            title: 'adminCreation',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'adminCreation',
                    title: 'USER MANAGEMENT',
                    type: 'item',
                    url: '/USER_MANAGEMENT',
                    icon: 'feather icon-trending-up',
                }
            ]
        },
        
       

        {
            id: '7',
            title: 'LOGOUT',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'Logout',
                    title: 'LOGOUT',
                    type: 'item',
                    url: '/Login',
                    icon: 'feather icon-power',
                }
            ]
        },
    ]
}