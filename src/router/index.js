import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  { path: '/',                              name: 'Home',           
    component: () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue') },
  { path: '/login',                         name: 'Login',          
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue') },
  { path: '/search',                        name: 'Search',         
    component: () => import(/* webpackChunkName: "Search" */ '@/views/Search.vue') },
  { path: '/register',                      name: 'Register',       
    component: () => import(/* webpackChunkName: "Register" */ '@/views/Register.vue') },
  { path: '/active/:activate/:id',          name: 'Activate',       
    component: () => import(/* webpackChunkName: "Activate" */ '@/views/Activate.vue') },
  { path: '/active/:activate/:id/:email',   name: 'ChangeActivate', 
    component: () => import(/* webpackChunkName: "ChangeActivate" */ '@/views/ChangeActivate.vue') },
  { path: '/forgetpassword/:code/:id/',     name: 'ResetPassword',  
    component: () => import(/* webpackChunkName: "ResetPassword" */ '@/views/ResetPassword.vue') },

  // blogs
  { path: '/show/blogs',        name: 'ShowBlogs',    
    component: () => import(/* webpackChunkName: "ShowBlogs" */ '@/views/blog/ShowBlogs.vue') },
  { path: '/show/blog/:id',     name: 'ShowBlog',     
    component: () => import(/* webpackChunkName: "ShowBlog" */ '@/views/blog/ShowBlog.vue') },
  { path: '/edit/blog',         name: 'NewBlog',      
    component: () => import(/* webpackChunkName: "NewBlog" */ '@/views/blog/EditBlog.vue') },
  { path: '/edit/blog/:id',     name: 'EditBlog', props: true,
    component: () => import(/* webpackChunkName: "EditBlog" */ '@/views/blog/EditBlog.vue') },

  // series
  { path: '/show/series',       name: 'ShowSeries',   
    component: () => import(/* webpackChunkName: "ShowSeries" */ '@/views/series/ShowSeries.vue') },
  { path: '/show/series/:id',   name: 'ShowOneSeries',
    component: () => import(/* webpackChunkName: "ShowOneSeries" */ '@/views/series/ShowOneSeries.vue') },
  { path: '/edit/series/',      name: 'NewSeries',    
    component: () => import(/* webpackChunkName: "NewSeries" */ '@/views/series/EditSeries.vue') },
  { path: '/edit/series/:id',   name: 'EditSeries', props: true,
    component: () => import(/* webpackChunkName: "EditSeries" */ '@/views/series/EditSeries.vue') },

  // questions
  { path: '/edit/question',     name: 'NewQuestion',  
    component: () => import(/* webpackChunkName: "NewQuestion" */ '@/views/question/EditQuestion.vue') },
  { path: '/show/questions',    name: 'ShowQuestions',
    component: () => import(/* webpackChunkName: "ShowQuestions" */ '@/views/question/ShowQuestions.vue') },
  { path: '/edit/question/:id', name: 'EditQuestion', 
    component: () => import(/* webpackChunkName: "EditQuestion" */ '@/views/question/EditQuestion.vue') },
  { path: '/show/question/:id', name: 'ShowQuestion', 
    component: () => import(/* webpackChunkName: "ShowQuestion" */ '@/views/question/ShowQuestion.vue') },

  // profile
  { path: '/profile/:id',            name: 'Profile',      
    component: () => import(/* webpackChunkName: "Profile" */ '@/views/Profile') ,
    children: [
      { path: 'information/',        name: 'ProfileInformation',   
        component: () => import(/* webpackChunkName: "ProfileInformation" */ '@/views/Profile/ProfileInformation.vue') },
      { path: 'blogs/',              name: 'ProfileBlog',          
        component: () => import(/* webpackChunkName: "ProfileBlog" */ '@/views/Profile/ProfileBlogs.vue') },
      { path: 'questions/',          name: 'ProfileQuestions',     
        component: () => import(/* webpackChunkName: "ProfileQuestions" */ '@/views/Profile/ProfileQuestions.vue') },
      { path: 'edit/profile/',       name: 'EditProfile',          
        component: () => import(/* webpackChunkName: "EditProfile" */ '@/views/Profile/EditProfile.vue') },
      { path: 'follow/',             name: 'ProfileFollow',        
        component: () => import(/* webpackChunkName: "ProfileFollow" */ '@/views/Profile/ProfileFollow.vue') },
      { path: 'skilltrees/',         name: 'ProfileSkillTrees',    
        component: () => import(/* webpackChunkName: "ProfileSkillTrees" */ '@/views/Profile/ProfileSkillTrees.vue') },
      { path: 'transactionrecord/',  name: 'TransactionRecord',    
        component: () => import(/* webpackChunkName: "TransactionRecord" */ '@/views/Profile/TransactionRecord.vue') },

      { path: 'messagecenter',       name: 'ProfileMessageCenter', 
        component: () => import(/* webpackChunkName: "ProfileMessageCenter" */ '@/views/Profile/ProfileMessageCenter.vue') ,
        children:[
          { path: 'friends/',        name: 'Friends',        
            component: () => import(/* webpackChunkName: "Friends" */ '@/components/Profile/MessageCenter/ProfileFriends.vue') },
          { path: 'reply/',          name: 'Reply',          
            component: () => import(/* webpackChunkName: "Reply" */ '@/components/Profile/MessageCenter/ProfileReply.vue') },
          { path: 'requestfriend/',  name: 'RequestFriend',  
            component: () => import(/* webpackChunkName: "RequestFriend" */ '@/components/Profile/MessageCenter/RequestFriend.vue') },
        ]
      },

      { path: 'settings',            name: 'ProfileSettings',
        component: () => import(/* webpackChunkName: "ProfileSettings" */ '@/views/Profile/ProfileSettings.vue'),
        children:[
          { path: 'changepassword/', name: 'ChangePassword', 
            component: () => import(/* webpackChunkName: "ChangePassword" */ '@/components/Profile/Settings/ChangePassword.vue') },
          { path: 'changemail/',     name: 'ChangeMail',     
            component: () => import(/* webpackChunkName: "ChangeMail" */ '@/components/Profile/Settings/ChangeMail.vue') },
        ]},
    ]},
]

const router = new VueRouter({
  routes
})

export default router
