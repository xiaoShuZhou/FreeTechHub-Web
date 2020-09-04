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
import Register from '@/views/Register.vue'
import Activate from '@/views/Activate.vue'
import ChangeActivate from '@/views/ChangeActivate.vue'
import ResetPassword from '@/views/ResetPassword.vue'

//Profile
import Profile from '@/views/Profile'
import ProfileInformation from '@/views/Profile/ProfileInformation'
import ProfileBlogs from '@/views/Profile/ProfileBlogs'
import ProfileFollow from '@/views/Profile/ProfileFollow'
import ProfileFriends from '@/components/Profile/MessageCenter/ProfileFriends'
import ProfileQuestions from '@/views/Profile/ProfileQuestions'
import ChangeMail from '@/components/Profile/Settings/ChangeMail'
import ChangePassword from '@/components/Profile/Settings/ChangePassword'
import ProfileSettings from '@/views/Profile/ProfileSettings'
import ProfileSkillTrees from '@/views/Profile/ProfileSkillTrees'
import ProfileMessageCenter from '@/views/Profile/ProfileMessageCenter'
import ProfileReply from '@/components/Profile/MessageCenter/ProfileReply'
import RequestFriend from '@/components/Profile/MessageCenter/RequestFriend'
import TransactionRecord from '@/views/Profile/TransactionRecord'
//
import EditProfile from '@/views/Profile/EditProfile.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/',                        name: 'Home',           component: Home },
  { path: '/login',                   name: 'Login',          component: Login },
  { path: '/search',                  name: 'Search',         component: Search },
  { path: '/register',                name: 'Register',       component: Register },
  { path: '/active/:activate/:id',    name: 'Activate',       component: Activate },
  { path: '/active/:activate/:id/:email',  name: 'ChangeActivate', component: ChangeActivate },
  { path: '/forgetpassword/:code/:id/',    name: 'ResetPassword',  component: ResetPassword },
  // blogs
  { path: '/show/blogs',        name: 'ShowBlogs',    component: ShowBlogs },
  { path: '/show/blog/:id',     name: 'ShowBlog',     component: ShowBlog },
  { path: '/edit/blog',         name: 'NewBlog',      component: EditBlog },
  { path: '/edit/blog/:id',     name: 'EditBlog',     component: EditBlog,      props: true },
  // series
  { path: '/show/series',       name: 'ShowSeries',   component: ShowSeries },
  { path: '/show/series/:id',   name: 'ShowOneSeries',component: ShowOneSeries },
  { path: '/edit/series/',      name: 'NewSeries',    component: EditSeries },
  { path: '/edit/series/:id',   name: 'EditSeries',   component: EditSeries,    props: true },
  // questions
  { path: '/edit/question',     name: 'NewQuestion',  component: EditQuestion},
  { path: '/show/questions',    name: 'ShowQuestions',component: ShowQuestions},
  { path: '/edit/question/:id', name: 'EditQuestion', component: EditQuestion},
  { path: '/show/question/:id', name: 'ShowQuestion', component: ShowQuestion},
  // profile
  { path: '/profile/:id',            name: 'Profile',      component: Profile,
    children:[
      { path: 'information/',        name: 'ProfileInformation',   component: ProfileInformation,},
      { path: 'blogs/',              name: 'ProfileBlog',          component: ProfileBlogs},
      { path: 'questions/',          name: 'ProfileQuestions',     component: ProfileQuestions,},
      { path: 'edit/profile/',       name: 'EditProfile',          component: EditProfile },
      { path: 'follow/',             name: 'ProfileFollow',        component: ProfileFollow},
      { path: 'skilltrees/',         name: 'ProfileSkillTrees',    component: ProfileSkillTrees},
      { path: 'transactionrecord/',  name: 'TransactionRecord',    component: TransactionRecord},
      { path: 'messagecenter',       name: 'ProfileMessageCenter', component: ProfileMessageCenter,
        children:[
          { path: 'friends/',        name: 'Friends',        component: ProfileFriends},
          { path: 'reply/',          name: 'Reply',          component: ProfileReply},
          { path: 'requestfriend/',  name: 'RequestFriend',  component: RequestFriend},
        ]
      },
      { path: 'settings',             name: 'ProfileSettings',component: ProfileSettings,
        children:[
          { path: 'changepassword/:id', name: 'ChangePassword', component: ChangePassword},
          { path: 'changemail/:id',     name: 'ChangeMail',     component: ChangeMail},
        ]},
    ]},
]

const router = new VueRouter({
  routes
})

export default router
