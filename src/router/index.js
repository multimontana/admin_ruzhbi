import Vue from 'vue'
import Router from 'vue-router'

//
const Dashboard = () => import('@/views/Dashboard')

//user
const User = () => import('@/views/user/User')
const CreateUser = () => import('@/views/user/CreateUser')
const EditUser = () => import('@/views/user/EditUser')

//category
const Category = () => import('@/views/category/Category')
const CreateCategory = () => import('@/views/category/CreateCategory')
const EditCategory = () => import('@/views/category/EditCategory')

//product
const Items = () => import('@/views/item/Item')
const CreateItem = () => import('@/views/item/CreateItem')
const EditItem = () => import('@/views/item/EditItem')

//Contractor
const Contractor = () => import('@/views/contractor/Contractor')
const CreateContractor = () => import('@/views/contractor/CreateContractor')
const EditContractor = () => import('@/views/contractor/EditContractor')

//Contact
const Contact = () => import('@/views/contact/Contact')

//Order
const Order = () => import('@/views/order/Order')

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views

const Colors = () => import('@/views/theme/Colors')
const Typography = () => import('@/views/theme/Typography')

const Charts = () => import('@/views/charts/Charts')
const Widgets = () => import('@/views/widgets/Widgets')

// Views - Components
const Cards = () => import('@/views/base/Cards')
const Forms = () => import('@/views/base/Forms')
const Switches = () => import('@/views/base/Switches')
const Tables = () => import('@/views/base/Tables')
const Tabs = () => import('@/views/base/Tabs')
const Breadcrumbs = () => import('@/views/base/Breadcrumbs')
const Carousels = () => import('@/views/base/Carousels')
const Collapses = () => import('@/views/base/Collapses')
const Jumbotrons = () => import('@/views/base/Jumbotrons')
const ListGroups = () => import('@/views/base/ListGroups')
const Navs = () => import('@/views/base/Navs')
const Navbars = () => import('@/views/base/Navbars')
const Paginations = () => import('@/views/base/Paginations')
const Popovers = () => import('@/views/base/Popovers')
const ProgressBars = () => import('@/views/base/ProgressBars')
const Tooltips = () => import('@/views/base/Tooltips')

// Views - Buttons
const StandardButtons = () => import('@/views/buttons/StandardButtons')
const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
const Dropdowns = () => import('@/views/buttons/Dropdowns')
const BrandButtons = () => import('@/views/buttons/BrandButtons')

// Views - Icons
const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')
const Brands = () => import('@/views/icons/Brands')
const Flags = () => import('@/views/icons/Flags')

// Views - Notifications
const Alerts = () => import('@/views/notifications/Alerts')
const Badges = () => import('@/views/notifications/Badges')
const Modals = () => import('@/views/notifications/Modals')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('../views/pages/Login')


Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {requiresAuth: true},
        component: TheContainer,
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: Dashboard
            },
            {
                name: 'User',
                path: 'user',
                meta: {requiresAuth: true},
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [
                    {
                        path: 'all',
                        name: 'Users',
                        component: User
                    },
                    {
                        path: 'create',
                        name: 'CreateUser',
                        component: CreateUser
                    },
                    {
                        path: 'edit',
                        name: 'EditUser',
                        component: EditUser
                    }
                ]
            },

            {
                name: 'Category',
                path: 'category',
                meta: {requiresAuth: true},
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [
                    {
                        path: 'all',
                        name: 'Categories',
                        component: Category
                    },
                    {
                        path: 'create',
                        name: 'CreateCategory',
                        component: CreateCategory
                    },
                    {
                        path: 'edit',
                        name: 'EditCategory',
                        component: EditCategory
                    }
                ]
            },
            {
                name: 'Item',
                path: 'item',
                meta: {requiresAuth: true},
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [
                    {
                        path: 'all',
                        name: 'Items',
                        component: Items
                    },
                    {
                        path: 'create',
                        name: 'CreateItem',
                        component: CreateItem
                    },
                    {
                        path: 'edit',
                        name: 'EditItem',
                        component: EditItem
                    }
                ]
            },
            {
                name: 'Contractors',
                path: 'contractor',
                meta: {requiresAuth: true},
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [
                    {
                        path: 'all',
                        name: 'Contractor',
                        component: Contractor
                    },
                    {
                        path: 'create',
                        name: 'CreateContractor',
                        component: CreateContractor
                    },
                    {
                        path: 'edit',
                        name: 'EditContractor',
                        component: EditContractor
                    }
                ]
            },
            {
                path: 'contact',
                name: 'Contact',
                meta: {requiresAuth: true},
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [
                    {
                        path: '/',
                        name: 'contactInfo',
                        component: Contact
                    }
                ]
            },
            {
                path: 'order',
                name: 'order',
                meta: {requiresAuth: true},
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [
                    {
                        path: '/',
                        name: 'orderInfo',
                        component: Order
                    }
                ]
            },
        ]
    },
    {
        path: '/pages',
        redirect: '/pages/404',
        name: 'Pages',
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: '404',
                name: 'Page404',
                component: Page404
            },
            {
                path: '500',
                name: 'Page500',
                component: Page500
            },
            {
                path: 'login',
                name: 'Login',
                component: Login
            }
        ]
    }
]


const router = new Router({
    mode: 'history',
    saveScrollPosition: true,
    routes: routes
})

router.beforeEach((to, from, next) => {
    let currentUser
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const match = document.cookie.match(new RegExp('(^| )' + '_token' + '=([^;]+)'))
    // eslint-disable-next-line prefer-const
    currentUser = match ? match[0].trim().slice(7, match[0].trim().length) : null
    if (!currentUser && requiresAuth) {
        next('/pages/login')
    } else {
        next()
    }
})

export default router
