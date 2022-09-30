const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    name:String,
    phone:Number,
    email:String,
    password:String,
    user_type:String,
    count:Number,
    favMentor:[String]
})

module.exports = mongoose.model('User',userSchema);