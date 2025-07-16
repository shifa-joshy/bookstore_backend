// impoert mongoose
const mongoose =require('mongoose')

// create structure to save data in db -to rergister a user

const  userSchema =new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email :{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    bio :{
        type:String,
        default:""
    },
     profile :{
        type:String,
        default:""
    },

})
 
// connect mongodb collection-users-with the schema

const users =mongoose.model('users',userSchema)
module.exports =users