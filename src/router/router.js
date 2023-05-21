import Main from '@/pages/Main.vue';
import PostPage from '@/pages/PostPage.vue';
import About from '@/pages/About.vue';
import PostIdPage from '@/pages/PostIdPage.vue';
import PostPageVueX from '@/pages/PostPageVueX.vue'
import {createRouter, createWebHistory} from "vue-router"

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/posts/:id',
        component: PostIdPage
    },
    {
        path: '/store',
        component: PostPageVueX
    },
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;