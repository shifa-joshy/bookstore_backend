// controller for job applications

// import model

const applications = require("../models/applicationModel");



// to add application form to bd

exports.addApplicationsController = async(req,res)=>{
    const {jobtitle ,fullname,qualification,email,phone, coverletter} =req.body

    const resume =req.file.filename
    console.log(resume);
    

    console.log(jobtitle ,fullname,qualification,email,phone, coverletter,resume);

    try{
        const existingApplication = await applications.findOne({jobtitle ,email})

        if(existingApplication){
            res.status(406).json("Already Applied")
        }
        else{
            const newApplication = new applications({
               jobtitle ,name:fullname,qualification,email,phone, coverletter,resume 
            })

            await newApplication.save()
            res.status(200).json(newApplication)
        }
    }
    catch(error){
       res.status(500).json(error)

    }
    
}

// to get all application forms

exports.getAllApplicationController = async(req,res)=>{

    //   const{search}=req.query
    // console.log(search);
    // {title: {$regex: search ,$options:"i"}}
   
    try{
        const allApplications = await applications.find()
        res.status(200).json(allApplications)
    }
    catch(error){
     res.status(500).json(error)
  
    }
}