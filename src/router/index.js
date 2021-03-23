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

//Variable
const Variable = () => import('@/views/variable/Variable')
const CreateVariable = () => import('@/views/variable/CreateVariable')
const EditVariable = () => import('@/views/variable/EditVariable')

//Contact
const Contact = () => import('@/views/contact/Contact')

//Order
const Order = () => import('@/views/order/Order')

// Containers
const TheContainer = () => import('@/containers/TheContainer')

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
            {
                name: 'Variable',
                path: 'variable',
                meta: {requiresAuth: true},
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [
                    {
                        path: 'all',
                        name: 'Variables',
                        component: Variable
                    },
                    {
                        path: 'create',
                        name: 'CreateVariable',
                        component: CreateVariable
                    },
                    {
                        path: 'edit',
                        name: 'EditVariable',
                        component: EditVariable
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
