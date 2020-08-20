import Model from "./Model";
import BASE_URL from '../consts';
import User from './User';
import axios from "axios";

class Transaction extends Model {
    static app_name = 'transaction'    // required
    static model_name = 'transaction'   // required

    // the input argument must be something like:
    // {id: xxx, ....(other data fields)}
    constructor({id, user, user_instance, amount, time, transaction_type, description}) {
        super({amount, user, transaction_type, description})     // data fields that is requried when save

        // required data fields
        this.app_name = 'transaction'  // required
        this.model = "transaction"      // required
        this.pk = id            // required

        // this custom data for Tag
        if (user_instance != undefined) {
            this.user_instance = new User(user_instance)
        }
        this.time = time
    }

    static async get_wrapped_transactions(id){
        let res = await axios.get(BASE_URL+`transaction/query/${id}/`)
        let wrap_transactions = []
        for (let item of res.data['transactions']){
            wrap_transactions.push(new Transaction(item))
        }
        return wrap_transactions
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

export default Transaction
