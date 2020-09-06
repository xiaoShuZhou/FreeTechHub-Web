import Model from "./Model"
import FriendRequest from "./FriendRequest"
import axios from 'axios'
import BASE_URL from '../consts'
import Followership from './Followership'

class User extends Model {
    static app_name = 'user'
    static model_name = 'user'

    // the input argument must be something like:
    // {id: xxx, ....(other data fields)}
    constructor({ id, last_login, is_superuser, date_joined,
                  username, email, date_of_birth, is_authorized,
                  balance, major, grade, bio, avatar, groups,
                  user_permissions, totallikes, totalviews}) {

        super({username, email, grade, bio, major, balance})     // data fields that is requried when save

        // required data fields
        this.app_name = 'user'
        this.model = "user"
        this.pk = id

        // this custom data for user
        this.last_login = last_login
        this.is_superuser = is_superuser
        this.date_joined = date_joined
        this.date_of_birth= date_of_birth
        this.last_login = last_login
        this.is_authorized = is_authorized
        this.major = major
        this.grade = grade
        this.bio = bio
        this.email = email
        this.avatar = avatar
        this.groups = groups
        this.totallikes = totallikes
        this.totalviews= totalviews
        this.user_permissions = user_permissions
        this.context = []
        this.newMessageNum = 0
    }

    // custom methods
    static async getSelf() {
        let res = await axios.get(BASE_URL+'user/getself/')
        return new User(res.data)
    }

    // get lists of followers and followings
    async getFollowershipList() {
        let res = await axios.get(BASE_URL+`user/getfollowerships/${this.pk}/`)
        let followers = []
        for (let follower of res.data.followers) {
            followers.push(new User(follower))
        }
        let followings = []
        for (let following of res.data.followings) {
            followings.push(new User(following))
        }
        return {
            followers: followers,
            followings: followings
        }
    }

    async follow(user_id) {
        let followership = new Followership({
            following: user_id,
            follower: this.pk
        })
        let res = await followership.save()
        return res.data
    }

    async unfollow(user_id) {
        let res = await axios.post(BASE_URL+'user/unfollow/', {
            following_id: user_id,
            follower_id: this.pk
        })
        return res.data
    }

    async is_followed(user_id) {
        let res = await axios.get(
            BASE_URL+`user/followship_check/${this.pk}/${user_id}`)
        return res.data
    }

    // get all the friends of this user
    async getFriends() {
        let res = await axios.get(BASE_URL+`user/getfriends/${this.pk}/`)
        let friends = []
        for (let raw_user of res.data) {
            friends.push(new User(raw_user))
        }
        return friends
    }

    // send a friend request
    async friend(user_id, note) {
        let friend_request = new FriendRequest({
            sender: this.pk,
            receiver: user_id,
            note: note
        })
        let res = await friend_request.save()
        return res.data
    }

    // get all the received friend requests of this user
    async getReceivedFriendRequests() {
        let res = await axios.get(BASE_URL+`user/get_received_requests/${this.pk}/`)
        let requests = []
        for (let request of res.data) {
            requests.push(new FriendRequest(request))
        }
        return requests
    }

    // get all the friend requests of this user
    async getFriendRequests() {
        let res = await axios.get(BASE_URL+`user/getrequests/${this.pk}/`)
        let requests = []
        for (let request of res.data) {
            requests.push(new FriendRequest(request))
        }
        return requests
    }


    static async changepassword(oldpassword, newpassword) {
        let res = await axios.post(BASE_URL+'user/changepassword/', {
            oldpassword, newpassword})
        this.context = res.data.data
        return this.context
    }


    static async changeemail(password, email) {
        let res = await axios.post(BASE_URL+'user/changeemail/', {
            password, email})
        this.context = res.data.data
        return this.context
    }

    // upload photo as avatar
    static async upload(e){
      let file = e.target.files[0];
      let param = new FormData();
      param.append('file', file);
      let config = {
        headers:{'Content-Type': 'multipart/form-data'}
      };
      let res = await axios.post(BASE_URL+'user/upload/', param,config)
      return res.data
    }

    // Get tags
    static async gettags(param) {
        let res = await axios.get(BASE_URL + `user/gettags/${param}/`)
        return res.data
    }

    // check whether the username or email exist
    static async checkrepeat(value, type) {
        let res = await axios.post(BASE_URL + `user/checkrepeat/`, {
            value, type})
        return res.data
    }

    //post registration information
    static async register(username, email, password){
        let res = await axios.post(BASE_URL +`user/register/`, {
            username, email, password})
        return res.data
    }

    //check whether the verification code is correct
    static async validate(code, user_id, type, email){
        let res = await axios.post(BASE_URL +`user/validate/`, {
            code, user_id, type, email})
        return res.data
    }

    //send forgetpassword email
    static async forgetpassword(email){
        let res = await axios.post(BASE_URL +`user/send_change/`, {
            email})
        return res.data
    }

    //check oldpassword right or not
    static async checkpassword(password){
        let res = await axios.post(BASE_URL +`user/checkpassword/`, {
            password})
        return res.data
    }

    static async resetpassword(password, id){
        let res = await axios.post(BASE_URL +`user/resetpassword/`, {
            password, id})
        return res.data
    }

    // get model by id
    static async get(id) {
        return await Model._getOne(this.app_name, this.model_name, id, this)
    }

    // get all the model
    static async all() {
        return await Model._raw_all(this.app_name, this.model_name, this)
    }
}

export default User
