// middlewate for upload images
// to parse formdata from front end and pass to controller

// import multer
const multer =require('multer')

console.log('inside the multer file');




// fun to store imgs

const storage =multer.diskStorage({

    destination: (req,file,callback)=>{
        callback(null ,'./imageupload')
    },
    filename:(req ,file,callback)=>{
        callback(null ,`image -${file.originalname}`)
    }
})

// fun to check image type

const fileFilter = (req,file,callback)=>{
    
    if(file.mimetype =='image/png' || file.mimetype =='image/jpg' || file.mimetype =='image/jpeg'){
      callback(null , true)
    }
    else{
        callback(null , false)
        return callback(new Error('only accept png,jpeg and jpg files'))
    }

}

const multerConfic = multer({
    storage,
    fileFilter
})

// export

module.exports =multerConfic