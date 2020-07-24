import axios from "axios"
import BASE_URL from '../consts';

class Model {
    static base_URL = BASE_URL

    constructor(attrs) {
        this.fields = []    // keeps records of which data fields are needed

        // setting the required fields (data fields that is reuqired when post/create/update)
        for (let attr in attrs) {
            this[attr] = attrs[attr]
            this.fields.push(attr.toString())
        }
        
        this.base_URL = BASE_URL
        this.pk = ''       // primary key field of this model (must be defined in concrete models)
    }

    // get the data that is required
    _getData() {
        let data = {}
        for (let field in this.fields) {
            data[this.fields[field]] = this[this.fields[field]]
        }
        return data
    }
    
    _getModelURL() {
        return this.base_URL + this.app_name + '/' + this.model + '/'
    }

    _getInstanceURL() {
        return this._getModelURL() + this.pk + '/'
    }

    // save this instance in the database
    async save() {
        let response = await axios.post(this._getModelURL(), this._getData())
        this.pk = response.data.id
    }

    // delete this instance from the database
    async delete() {
        await axios.delete(this._getInstanceURL())
    }

    // update this instance in the database
    async update() {
        let response = await axios.put(this._getInstanceURL(), this._getData())
        this.pk = response.data.id
    }

    // request one record
    static async _getOne(app_name, model_name, id, constructor) {
        let response = await axios.get(
            this.base_URL + app_name + '/' + model_name + '/' + id + '/'
        )
        let model = new constructor(response.data)
        return model
    }

    // get all the records of this model
    static async _raw_all(app_name, model_name, constructor) {
        let res = [];
        let response = await axios.get(this.base_URL + app_name + '/' + model_name + '/')
        response.data.forEach(element => {
            res.push(new constructor(element))
        })
        return res
    }
}

export default Model
