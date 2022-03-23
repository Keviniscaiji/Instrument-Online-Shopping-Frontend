import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
    { path: '/login', component: () =>
            import ('@/views/login/index'), hidden: true },
    { path: '/404', component: () =>
            import ('@/views/404'), hidden: true },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: 'Dashboard',
        hidden: true,
        children: [{
            path: 'dashboard',
            component: () =>
                import ('@/views/dashboard/index')
        }]
    },
    {
        path: '/user',
        component: Layout,
        redirect: '/user/list',
        name: 'User',
        meta: { title: 'User', icon: 'example' },
        children: [{
                path: 'list',
                name: 'List',
                component: () =>
                    import ('@/views/user/list'),
                meta: { title: 'List', icon: 'user' }
            },
            {
                path: 'save',
                name: 'Add',
                component: () =>
                    import ('@/views/user/save'),
                meta: { title: 'Add', icon: 'form' }
            },
            {
                path: 'edit/:id',
                name: 'Edit',
                component: () =>
                    import ('@/views/user/save'),
                meta: { title: 'Edit', icon: 'form' },
                hidden: true
            }
        ]
    },
    {
        path: '/commodity',
        component: Layout,
        redirect: '/commodity/list',
        name: 'Commodity',
        meta: { title: 'Commodity', icon: 'example' },
        children: [{
                path: 'list',
                name: 'List',
                component: () =>
                    import ('@/views/commodity/list'),
                meta: { title: 'List', icon: 'user' }
            },
            {
                path: 'basic',
                name: 'Add',
                component: () =>
                    import ('@/views/commodity/basic'),
                meta: { title: 'Add', icon: 'form' }
            },
            {
                path: 'basic/:id',
                name: 'EditBasic',
                component: () =>
                    import ('@/views/commodity/basic'),
                meta: { title: 'EditBasic', icon: 'form' },
                hidden: true
            },
            {
                path: 'intro/:id',
                name: 'EditIntro',
                component: () =>
                    import ('@/views/commodity/intro'),
                meta: { title: 'EditIntro', icon: 'form' },
                hidden: true
            },
            {
                path: 'publish/:id',
                name: 'Publish',
                component: () =>
                    import ('@/views/commodity/publish'),
                meta: { title: 'Publish', icon: 'form' },
                hidden: true
            },
            {
                path: 'comment/:id',
                name: 'Manage Comment',
                component: () =>
                    import ('@/views/commodity/comment'),
                meta: { title: 'Comment', icon: 'form' },
                hidden: true
            }
        ]
    },
    {
        path: 'swagger',
        component: Layout,
        children: [{
            path: process.env.BASE_API + '/swagger-ui.html',
            meta: { title: 'Api test', icon: 'link' }
        }]
    },

    {
        path: 'Druid Monitor',
        component: Layout,
        children: [{
            path: process.env.BASE_API + '/druid/index.html',
            meta: { title: 'Druid Monitor', icon: 'link' }
        }]
    },

    {
        path: 'external-link',
        component: Layout,
        children: [{
            path: 'http://175.178.116.88/group13/staff-portal-front-end',
            meta: { title: 'External Link', icon: 'link' }
        }]
    },



    { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})