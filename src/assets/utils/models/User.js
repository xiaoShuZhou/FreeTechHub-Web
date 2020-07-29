import Model from "./Model"
import axios from 'axios'
class User extends Model {
    static app_name = 'user'    // required
    static model_name = 'user'   // required

    // the input argument must be something like:
    // {id: xxx, ....(other data fields)}
    constructor({ id, last_login, is_superuser,date_joined,username,email,date_of_birth,is_authorized,balance,major,grade,
                bio,avatar,groups,user_permissions,follower_users}) {
        super({username, email,grade,bio})     // data fields that is requried when save

        // required data fields
        this.app_name = 'user'  // required
        this.model = "user"      // required
        this.pk = id            // required

        // this custom data for Tag
        this.last_login = last_login
        this.is_superuser = is_superuser
        this.date_joined = date_joined
        this.date_of_birth= date_of_birth
        this.last_login = last_login
        this.is_authorized = is_authorized
        this.balance = balance
        this.major = major
        this.grade = grade
        this.bio = bio
        this.avatar = avatar
        this.groups = groups
        this.user_permissions = user_permissions
        this.follower_users = follower_users


    }

    static async getSelf() {
        let res = await axios.get('http://127.0.0.1:8000/user/getself/')
        return new User(res.data)
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
