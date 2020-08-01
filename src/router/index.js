import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// blog
import ShowBlogs from '@/views/blog/ShowBlogs.vue'
import ShowBlog from '@/views/blog/ShowBlog.vue'
import EditBlog from '@/views/blog/EditBlog.vue'
// series
import ShowSeries from "@/views/series/ShowSeries.vue"
import ShowOneSeries from "@/views/series/ShowOneSeries.vue"
import EditSeries from "@/views/series/EditSeries.vue"
// questions
import EditQuestion from '@/views/question/EditQuestion.vue'
import ShowQuestions from '@/views/question/ShowQuestions.vue'
import ShowQuestion from '@/views/question/ShowQuestion.vue'

import Login from '@/views/Login.vue'
import Search from '@/views/Search.vue'

//Profile
import Profile from '@/views/Profile/Profile.vue'
import ShowProfile from '@/views/Profile/ShowProfile.vue'
import EditProfile from '@/views/Profile/EditProfile.vue'
import ShowFollowing from '@/views/Profile/ShowFollowing.vue'
import Setting from '@/views/Profile/Setting.vue'
import ChangePassword from '@/views/Profile/setting/ChangePassword.vue'
import ChangeEmail from '@/views/Profile/setting/ChangeEmail.vue'
import ForgetPassword from '@/views/Profile/setting/ForgetPassword.vue'



Vue.use(VueRouter)

const routes = [
  { path: '/',                  name: 'Home',         component: Home },
  { path: '/login',             name: 'Login',        component: Login },
  { path: '/search',            name: 'Search',       component: Search },
  //profile
  { path: '/profile',           name: 'Profile',      component: Profile,
  children: [
    { path: 'showprofile/:id',   name: 'ShowProfile',        component: ShowProfile },
    { path: 'edit/profile/:id',  name: 'EditProfile',        component: EditProfile },
    { path: 'showfollowing/:id', name: 'ShowFollowing',      component: ShowFollowing },
    { path: 'setting/',          name: 'Setting',            component: Setting,
    children: [
      { path: 'changepassword/:id',   name: 'ChangePassword',        component: ChangePassword },
      { path: 'changeemail/:id',      name: 'ChangeEmail',           component: ChangeEmail },
      { path: 'forgetpassword/:id',   name: 'ForgetPassword',        component: ForgetPassword },
    ]
  },
  ] },
  // blogs
  { path: '/show/blogs',        name: 'ShowBlogs',    component: ShowBlogs },
  { path: '/show/blog/:id',     name: 'ShowBlog',     component: ShowBlog },
  { path: '/edit/blog',         name: 'NewBlog',      component: EditBlog },
  { path: '/edit/blog/:id',     name: 'EditBlog',     component: EditBlog },
  // series
  { path: '/show/series',       name: 'ShowSeries',   component: ShowSeries },
  { path: '/show/series/:id',   name: 'ShowOneSeries',component: ShowOneSeries },
  { path: '/edit/series/',      name: 'NewSeries',    component: EditSeries },
  { path: '/edit/series/:id',   name: 'EditSeries',   component: EditSeries },
  // questions
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
