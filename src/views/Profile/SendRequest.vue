<template>
<div class="ShowProfile">
  <ul>
    <li>
      <div class="card">
        <h4>MESSAGE: </h4>
        <input type="text" v-model="request_message"/>
        <button v-if="user && user.pk" @click='addfriend'>SEND</button>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
import User from '@/assets/utils/models/User'
import FriendRequest from '@/assets/utils/models/FriendRequest'
import { is_authenticated} from '@/assets/utils/auth'
export default {
  name: 'SendRequest',
  components: {

  },
  data() {
    return {
      user: '',
      follow: '',
      from_user:'',
      request_message:'',

    }
  },
  methods: {
    _getFriendRequest() {
      return new FriendRequest({
        to_user:this.user.pk,
        from_user:this.from_user.pk,
        request_message: this.request_message
      })
    },
    addfriend() {
    User.getSelf().then(from_user =>{
      this.from_user = from_user
      let friendRequest = this._getFriendRequest()
      friendRequest.save()
      User.getSelf()
      .then(user =>{
        this.$router.push({name:"ProfileInformation", params:{id: user.pk}})
        })
    })
    },
  },
  created() {
    if (!is_authenticated()) {
      this.$router.push({name: 'Login'})
    } else {
      User.get(this.$route.params.id)
      .then(user => this.user = user)
    }

  },
}
</script>
