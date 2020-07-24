import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ShowBlogs from '@/views/ShowBlogs.vue'
import BlogDetail from '@/views/BlogDetail.vue'
import EditBlog from '@/views/EditBlog.vue'
import Login from '@/views/Login.vue'

Vue.use(VueRouter)

  const routes = [
  { path: '/',              name: 'Home',       component: Home },
  { path: '/show/blogs',    name: 'showBlogs',  component: ShowBlogs },
  { path: '/show/blog/:id', name: 'showBlog', component: BlogDetail },
  { path: '/edit/blog',     name: 'newBlog',    component: EditBlog },
  { path: '/edit/blog/:id', name: 'editBlog',   component: EditBlog },
  { path: '/login',         name: 'login',      component: Login },
  { path: '/about',         name: 'About', component: () => import(/* webpackChunkName: "about" */ '../views/About.vue') }
]

const router = new VueRouter({
  routes
})

export default router
