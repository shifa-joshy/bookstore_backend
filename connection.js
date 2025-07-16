// import mongoose

const mongoose =require('mongoose')

// access connection string

const connectionstring = process.env.DATABASE

// connection

mongoose.connect(connectionstring).then(()=>{
    console.log('mongodb connected successfully');
    
}).catch((err)=>{
    console.log(`mongodb connection failed due to :${err}`);
    
})