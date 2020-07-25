import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ShowBlogs from '@/views/ShowBlogs.vue'
import BlogDetail from '@/views/BlogDetail.vue'
import EditBlog from '@/views/EditBlog.vue'
import Login from '@/views/Login.vue'
import PostQuestion from '@/views/PostQuestion'
import ShowQuestions from '@/views/ShowQuestions'
import QuestionDetail from '@/views/QuestionDetail'

Vue.use(VueRouter)

  const routes = [
  { path: '/',                  name: 'Home',         component: Home },
  { path: '/show/blogs',        name: 'showBlogs',    component: ShowBlogs },
  { path: '/show/blog/:id',     name: 'showBlog',     component: BlogDetail },
  { path: '/edit/blog',         name: 'newBlog',      component: EditBlog },
  { path: '/edit/blog/:id',     name: 'editBlog',     component: EditBlog },
  { path: '/login',             name: 'login',        component: Login },
  { path: '/about',             name: 'About',        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue') },
  { path: '/edit/question',     name:'newQuestion',   component: PostQuestion},
  { path: '/show/questions',    name:'showQuestions', component: ShowQuestions},
  { path: '/edit/question/:id', name:'editQuestion',  component: PostQuestion},
  { path: '/show/question/:id', name:'showQuestion',  component: QuestionDetail},
]

const router = new VueRouter({
  routes
})

export default router
