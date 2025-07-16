// model to add books in mongodb



const mongoose =require('mongoose')


// schema of adding book in db
const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
     author:{
        type:String,
        require:true
    },
     publisher:{
        type:String,
        require:true
    },
     language:{
        type:String,
        require:true
    },
     noofpages:{
        type:Number,
        require:true
    },
     isbn:{
        type:String,
        require:true
    },
     imageurl:{
        type:String,
        require:true
    },
    category :{
        type:String,
        require:true
    },
     price:{
        type:Number,
        require:true
    },
     dprice:{
        type:Number,
        require:true
    },
     abstract:{
        type:String,
        require:true
    },
    uploadimage:{
        type:Array,
        require:true
    },
    userMail:{
        type:String,
        require:true
    },
     status:{
        type:String,
        require:"pending"
    },
     BroughtBy:{
        type:String,
        require:""
    }
    
})   

// connect mongodb collection-books-with the schema

const books =mongoose.model('books',bookSchema)
module.exports =books
