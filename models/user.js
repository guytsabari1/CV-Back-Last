const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newUser = new Schema(
    {
        userName: {type: String, required: true, unique:false},
        password: {type: String, required: true},
        email: {type: String, required: true, unique:true},
        cvs: [{type: mongoose.Types.ObjectId, ref: "cv", required: false}]
    }

)

module.exports = mongoose.model("User",newUser)