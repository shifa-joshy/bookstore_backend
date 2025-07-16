// router specific middleware
// IMPORT JWT
const jwt =require('jsonwebtoken')


 const jwtMiddleware =(req,res,next)=>{
    // logic

    console.log('inside jwt middleware');
    const token =req.headers["authorization"].split(' ')[1]
     console.log(token)
    try{
        const jwtResponse =jwt.verify(token,process.env.JWTSECRETKEY)
        console.log(jwtResponse);
        // to get user identity
        req.payload = jwtResponse.userMail
        next()
        
    }    
    catch(error){
        res.status(406).json('authorization failed',error)
    }

 }

 module.exports=jwtMiddleware