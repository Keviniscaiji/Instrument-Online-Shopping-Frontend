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
    { path: '/middlepage', component: () =>
            import ('@/views/middlepage/index'), hidden: true },
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
            },
            {
                path: 'detail/:id',
                name: 'Comment Detail',
                component: () =>
                    import ('@/views/commodity/detail'),
                meta: { title: 'Detail', icon: 'form' },
                hidden: true
            },
            {
                path: 'likeList/:id',
                name: 'Manage Comment likeList',
                component: () =>
                    import ('@/views/commodity/likeList'),
                meta: { title: 'LikeList', icon: 'form' },
                hidden: true
            },
            {
                path: 'likes/:id',
                name: 'Manage Commodity likeList',
                component: () =>
                    import ('@/views/commodity/likes'),
                meta: { title: 'Likes', icon: 'form' },
                hidden: true
            }
        ]
    },
    {
        path: '/post',
        component: Layout,
        redirect: '/post/list',
        name: 'Post',
        meta: { title: 'Post', icon: 'example' },
        alwaysShow: true,
        children: [{
                path: 'list',
                name: 'List',
                component: () =>
                    import ('@/views/post/list'),
                meta: { title: 'List', icon: 'user' }
            },
            {
                path: 'info/:id',
                name: 'PostInfo',
                component: () =>
                    import ('@/views/post/info'),
                meta: { title: 'PostInfo', icon: 'form' },
                hidden: true
            },
            {
                path: 'comment/:id',
                name: 'Manage Comment',
                component: () =>
                    import ('@/views/post/comment'),
                meta: { title: 'Comment', icon: 'form' },
                hidden: true
            },
            {
                path: 'detail/:id',
                name: 'Comment Detail',
                component: () =>
                    import ('@/views/post/detail'),
                meta: { title: 'Detail', icon: 'form' },
                hidden: true
            },
            {
                path: 'likeList/:id',
                name: 'Manage likeList',
                component: () =>
                    import ('@/views/post/likeList'),
                meta: { title: 'LikeList', icon: 'form' },
                hidden: true
            }
        ]
    },
    // order
    {
        path: '/order',
        component: Layout,
        redirect: '/order/list',
        name: 'Order',
        meta: { title: 'Order', icon: 'example' },
        alwaysShow: true,
        children: [{
                path: 'list',
                name: 'List',
                component: () =>
                    import ('@/views/order/list'),
                meta: { title: 'List', icon: 'user' }
            },
            {
                path: 'edit/:id',
                name: 'Edit',
                component: () =>
                    import ('@/views/order/edit'),
                meta: { title: 'Edit', icon: 'form' },
                hidden: true
            }
        ]
    },
    {
        path: '/sta',
        component: Layout,
        redirect: '/sta/create',
        name: 'Statistical',
        meta: { title: 'Sta', icon: 'example' },
        children: [{
                path: 'create',
                name: 'Create Data',
                component: () =>
                    import ('@/views/sta/create'),
                meta: { title: 'CreateData', icon: 'table' }
            },
            {
                path: 'show',
                name: 'Charts',
                component: () =>
                    import ('@/views/sta/show'),
                meta: { title: 'Charts', icon: 'tree' },
            }
        ],
    },
    {
        path: '/chat',
        component: Layout,
        redirect: '/chat/container',
        name: 'Chat',
        alwaysShow: true,
        meta: { title: 'Chat', icon: 'example' },
        children: [{
                path: 'container/:id',
                name: 'container',
                component: () =>
                    import ('@/views/chat/container'),
                meta: { title: 'Chat', icon: 'table' }
            },
            // {
            //     path: 'show',
            //     name: 'Charts',
            //     component: () =>
            //         import ('@/views/sta/show'),
            //     meta: { title: 'Charts', icon: 'tree' },
            // }
        ],
        hidden: true
    },


    {
        path: '/swagger',
        component: Layout,
        meta: { title: 'Swagger', icon: 'link' },
        children: [{
            path: process.env.BASE_API + '/swagger-ui.html',
            meta: { title: 'Swagger', icon: 'link' }
        }]
    },

    {
        path: '/Druid Monitor',
        component: Layout,
        meta: { title: 'DruidMonitor', icon: 'link' },
        children: [{
            path: process.env.BASE_API + '/druid/index.html',
            meta: { title: 'DruidMonitor', icon: 'link' }
        }]
    },

    {
        path: '/external-link',
        component: Layout,
        meta: { title: 'ExternalLink', icon: 'link' },
        children: [{
            path: 'http://175.178.116.88/group13/staff-portal-front-end',
            meta: { title: 'ExternalLink', icon: 'link' }
        }]
    },



    { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})