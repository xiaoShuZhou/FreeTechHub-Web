import Model from "./Model";
import Message from "./Message"
import axios from "axios"
import BASE_URL from "../consts"

class Chat extends Model {
    static app_name = 'user'    // required
    static model_name = 'chat'   // required

    // the input argument must be something like:
    // {id: xxx, ....(other data fields)}
    constructor({id, user1, user2, messages}) {
        super({user1, user2})     // data fields that is requried when save

        // required data fields
        this.app_name = 'user'  // required
        this.model = "chat"      // required
        this.pk = id            // required

        // this custom data for Chat
        if (messages != undefined) {
            this.messages = []
            messages.forEach(message => this.messages.push(new Message(message)))
        }
    }

    static async getChat(sender_id, receiver_id) {
        let res = await axios.get(BASE_URL+'user/getchat/', { 
            params: { sender: sender_id, receiver: receiver_id }
        })
        return new Chat(res.data)
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

export default Chat
