const mongoose = require("mongoose")
const moment = require('moment-timezone')



const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {type:String, require:true, unique:true, maxLength:100, minLength:1},
    password: {type:String,required:true, maxLength:100},
    created_date: {type: Date, default:Date.now},
},
{toJSON:{virtuals:true}}
)

module.exports = mongoose.model("User",UserSchema)