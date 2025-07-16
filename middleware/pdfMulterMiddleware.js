// middlewate for upload images

const multer =require('multer')

console.log('inside the multer file');



const storage =multer.diskStorage({

    destination: (req,file,callback)=>{
        callback(null ,'./pdfUploads')
    },
    filename:(req ,file,callback)=>{
        callback(null ,`resume -${file.originalname}`)
    }
})

const fileFilter = (req,file,callback)=>{
    
    if(file.mimetype =='application/pdf' ){
      callback(null , true)
    }
    else{
        callback(null , false)
        return callback(new Error('only accept pdf files'))
    }

}

const pdfMulterConfic = multer({
    storage,
    fileFilter
})

module.exports = pdfMulterConfic