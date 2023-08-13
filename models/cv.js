
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cv = new Schema(
    {
        summary: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        skillHighLights: { type: Array, required: true },
        experience: [{ type: Object, required: true }],
        education: [{ type: Object, required: true }],
        languages: { type: Array, required: true },
        hobbies: { type: Array, required: true },
        fullName: {type: String, required: true},
        role:{type: String, required: true},
        template: {type: String, required: true} 

         
    }

)

module.exports = mongoose.model("cv", cv)
