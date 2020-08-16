import Model from "./Model";

class Message extends Model {
    static app_name = 'user'    // required
    static model_name = 'message'   // required

    // the input argument must be something like:
    // {id: xxx, ....(other data fields)}
    constructor({id, content, datetime, belonging_chat, sender, receiver}) {
        super({content, belonging_chat, sender})     // data fields that is requried when save

        // required data fields
        this.app_name = 'user'  // required
        this.model = "message"      // required
        this.pk = id            // required

        // this custom data for Message
        this.datetime = datetime
        this.receiver = receiver
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

export default Message
