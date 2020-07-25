import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ShowBlogs from '@/views/ShowBlogs.vue'
import ShowBlog from '@/views/ShowBlog.vue'
import EditBlog from '@/views/EditBlog.vue'
import Login from '@/views/Login.vue'
import EditQuestion from '@/views/EditQuestion'
import ShowQuestions from '@/views/ShowQuestions'
import ShowQuestion from '@/views/ShowQuestion'

Vue.use(VueRouter)

const routes = [
  { path: '/',                  name: 'Home',         component: Home },
  { path: '/login',             name: 'Login',        component: Login },
  { path: '/show/blogs',        name: 'ShowBlogs',    component: ShowBlogs },
  { path: '/show/blog/:id',     name: 'ShowBlog',     component: ShowBlog },
  { path: '/edit/blog',         name: 'NewBlog',      component: EditBlog },
  { path: '/edit/blog/:id',     name: 'EditBlog',     component: EditBlog },
  { path: '/edit/question',     name: 'NewQuestion',  component: EditQuestion},
  { path: '/show/questions',    name: 'ShowQuestions',component: ShowQuestions},
  { path: '/edit/question/:id', name: 'EditQuestion', component: EditQuestion},
  { path: '/show/question/:id', name: 'ShowQuestion', component: ShowQuestion},
  { path: '/about',             name: 'About',        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue') }
]

const router = new VueRouter({
  routes
})

export default router
