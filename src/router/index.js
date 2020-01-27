import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/*
/blog/v/category... -> alias 를 사용하여 /blog 로 보이도록 함.
  - /blog/v/:category
/blog/posts/... -> 포스팅을 보여줌.
  - /blog/posts/:post
 */

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('../views/Home.vue'),
		meta: { title: 'Vue Blog' },
	},
	{
		path: '/blog',
		name: 'Blog',
		component: () => import('../views/Blog.vue'),
		children: [
			{
				path: '',
				component: () => import('../views/Blog/BlogCategory.vue'),
				alias: '/blog',
			},
			{
				path: 'category/:category(.*)',
				component: () => import('../views/Blog/BlogCategory.vue'),
				alias: '/blog',
			},
			{
				path: 'posts/:path(.*)',
				component: () => import('../views/Blog/BlogPost.vue'),
				alias: '/blog',
			},
		],
		meta: { title: 'Vue Blog' },
	},
	{
		path: '/album',
		name: 'Album',
		component: () => import('../views/Album.vue'),
		meta: { title: 'Vue Blog Album' },
	},
	{
		path: '/portfolio',
		name: 'Portfolio',
		component: () => import('../views/Portfolio.vue'),
		meta: { title: 'Vue Blog Portfolio' },
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
