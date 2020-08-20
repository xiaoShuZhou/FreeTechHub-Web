<template>
  <div class="Profile">
    <ProfileLeftNavbar class="sidebar"
      v-if="profile_owner != '' && visitor != ''" 
      :_is_owner=is_owner 
      :_user=profile_owner />
    <transition>
      <router-view class="content" mode="out-in" 
        v-if="profile_owner != '' && visitor != ''" 
        :_user=profile_owner 
        :_is_owner=is_owner
        :_visitor=visitor >
      </router-view>
    </transition>
  </div>
</template>

<script>
import ProfileLeftNavbar from '@/views/Profile/ProfileLeftNavbar'
import {login_required} from '@/assets/utils/auth'
import User from '@/assets/utils/models/User'


export default {
  name: 'Profile',
  components:{
    ProfileLeftNavbar
  },
  data() {
    return {
      profile_owner: '',
      visitor: '',
      is_owner: false
    }
  },
  methods: {
    load() {
      login_required(this, visitor => {
        this.visitor = visitor
        if(this.user_id != undefined) {
          User.get(this.user_id).then(user =>{
            this.profile_owner = user
            if(this.profile_owner.pk == visitor.pk) {
              this.is_owner = true
            } else {
              this.is_owner = false
            }
          })
        }
      })
    }
  },
  created() {
    this.load()
  },
  computed: {
    user_id() {
      return this.$route.params.id
    }
  },
  watch: {
    user_id() {
      this.profile_owner = ''
      this.visitor = ''
      this.load()
    }
  }
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  text-decoration: none;
  font-family: Georgia, 'Times New Roman', Times, serif;
}

.Profile {
  display: grid;
  grid-template-columns: 15% 85%;
  grid-template-areas: "left content";
  grid-template-rows: 100%;
}
.sidebar{
  grid-area: left;
  transition: all 0.5s ease;
}
.content{
  grid-area: content;
  transition: all 0.5s ease;
}
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(10%);
}

.v-enter-active,
.v-leave-active {
  transition: all 1s ease;
}
@media screen and (max-width: 1280px){
  .Profile {
  display: grid;
  grid-template-columns: 100%;
  grid-template-areas: "content";
  grid-template-rows: 100%;
  transition: all 0.5s ease-in-out;
  }
  .content{
    height: 100vh;
  }
}
</style>
