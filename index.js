// importiong.................................


// import dotenv module and call config to load environmenatal variables(no need of further use so importing isnot assign to a varivale)

require('dotenv').config()

// import express

 const express =require('express')
 
//  import cors
const cors= require('cors')

// import routes and use it
const routes =require('./routes')

// import connection file to establish contact b\w server and db
require('./connection')


// ..........................................




// create server
const bookstoreServer = express()

// use CORS to connect with frontend

bookstoreServer.use(cors())

// to parse json data

bookstoreServer.use(express.json())

// set up Routes-routes.js
bookstoreServer.use(routes)


// to export  'uploadimg' folder to front end...........

bookstoreServer.use('/upload',express.static('./imageupload'))

// to export  'uploadpdf' folder to front end...........

bookstoreServer.use('/pdfuploads',express.static('./pdfuploads'))






// set PORT

 const PORT =4000 || process.env.PORT

// listen to the prot-to know requst come or not

bookstoreServer.listen(PORT,()=>{
    console.log(`server running successfully at port number ${PORT} `);
    
})