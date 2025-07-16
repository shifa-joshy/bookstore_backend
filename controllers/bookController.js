//  add a book
// impor model

const books =require('../models/bookModel')

// import stripe
const stripe = require('stripe')(process.env.STRIPESECRETKEY)


exports. addBookController=async(req,res)=>{

    // logic to add bokks
      // res.status(200).json('req received')
  const{title,author,publisher,language,noofpages,isbn,imageurl,category,price,dprice,abstract}=req.body

  console.log(title,author,publisher,language,noofpages,isbn,imageurl,category,price,dprice,abstract);

  console.log(req.files);

  console.log(req.payload);
  
    try{
      const existingBook = await books.findOne({title,userMail:req.payload})
       
      if(existingBook){
        res.status(401).json('book already exit')
      }
      else{
        const newBook =new books({
          title,author,publisher,language,noofpages,isbn,imageurl,category,price,dprice,abstract,uploadimage:req.files,userMail:req.payload
        })
        await newBook.save()
         res.status(200).json(newBook)
      }
    }
    catch(error){
      res.status(500).json(error)
    }





}


// controller to get book dtails from db

exports.homeBookController =async(req,res)=>{
  try{
    const allHomeBooks =await books.find().sort({_id:-1}).limit(4)
    res.status(200).json(allHomeBooks)
  }
  catch(error){
    res.status(500).json(error)
  }
}


// to get all bokks -userside

exports.getAllBookUserContoller=async(req,res)=>{
const{search}=req.query
console.log(search);

// access users identity
const userMail =req.payload

try{

      const query={
        title:{
          $regex:search,$options:'i'
        },
        userMail:{
          $ne:userMail
        }

      }

    const allBooksUser= await books.find(query)
    res.status(200).json(allBooksUser)

  }
  catch(error){
    res.status(500).json(error)
  }
}


// to get a particular book with its id

exports.viewBookControleer=async(req,res)=>{
  // destructure id from fe
  const {id}=req.params
  // console.log(id);

  try{
    const specificBook = await books.findOne({_id:id})
    res.status(200).json(specificBook)
  }
  catch(error){
    res.status(500).json(error)
  }
  
}

// to get only  user added book--profile page
exports.getAllUserAddedBooksController=async(req,res)=>{
  const userMail = req.payload
  try{
    const allUserBooks =await books.find({userMail})
    res.status(200).json(allUserBooks)
  }
  catch(error){
    res.status(500).json(error)
  }
}


// to get only  user brought  book--profile page

exports.getAllUserBroughtBooksController=async(req,res)=>{
  const userMail = req.payload
  try{
    const allUserBroughtBooks =await books.find({BroughtBy:userMail})
    res.status(200).json(allUserBroughtBooks)
  }
  catch(error){
    res.status(500).json(error)
  }
}

// to delete a book from profilr page

exports.deleteBookController=async(req,res)=>{

  const{id}=req.params
  console.log(id);

  try{
    await books.findByIdAndDelete({_id:id})
    res.status(200).json('deleted')
  }
  catch(error){
    res.status(500).json(error)
  }
  

}

// make payment

exports.paymentController = async (req, res) => {
    const userEmail = req.payload
    console.log(userEmail);

    const{bookDetails} = req.body
    console.log(bookDetails);

    try {

        // const existingBook = await books.findByIdAndUpdate({ _id: bookDetails._id }, {
        //     title: bookDetails.title,
        //     author: bookDetails.author,
        //     publisher: bookDetails.publisher,
        //     language: bookDetails.language,
        //     noofpages: bookDetails.noofpages,
        //     isbn: bookDetails.isbn,
        //     imageurl: bookDetails.imageurl,
        //     category: bookDetails.category,
        //     price: bookDetails.price,
        //     dprice: bookDetails.dprice,
        //     abstract: bookDetails.abstract,
        //     uploadimage: bookDetails.uploadimage,
        //     userMail: bookDetails.userMail,
        //     status: 'sold',
        //     BroughtBy: userEmail


        // }, { new: true })

        // console.log(existingBook);



        //setup line  items
       
       
        const line_item = [{
            price_data: {
                currency: 'usd',//dollare etc....
                product_data: {
                    name: bookDetails.title,
                    description: `${bookDetails.author} | ${bookDetails.publisher} `,
                    images: [bookDetails.imageurl],
                    metadata: {
                        title: bookDetails.title,
                        author: bookDetails.author,
                        publisher: bookDetails.publisher,
                        language: bookDetails.language,
                        noofpages: bookDetails.noofpages,
                        isbn: bookDetails.isbn,
                        imageurl: bookDetails.imageurl,
                        category: bookDetails.category,
                        price: `${bookDetails.price}`,
                        dprice: `${bookDetails.price}`,
                        abstract: bookDetails.abstract.slice(0,20),
                        // uploadimage: bookDetails.uploadimage,
                        userMail: bookDetails.userMail,
                        status: 'sold',
                        BroughtBy: userEmail
                    }
                },
                unit_amount: Math.round(bookDetails.dprice * 100)//purchase amount
            },
            quantity: 1

        }]

 // create stripe -checkout session

        const session = await stripe.checkout.sessions.create({

            // payment modes
            payment_method_types: ['card'],

            // details of product that we are purchasing
            line_items: line_item,

            // period of payment-one time
            mode: 'payment',

            // navigate after payment
            success_url: 'http://localhost:5173/payment-success',
            cancel_url: 'http://localhost:5173/payment-error'

        })

      console.log(session);

     res.status(200).json({sessionId:session.id})



    }
    catch (error) {
        res.status(500).json(error)
    }


}

// ....................ADMIN SIDE.........................................

// to get all books

exports.getAllBookContoller = async(req,res)=>{
  try{
    const allBooks = await books.find()
    res.status(200).json(allBooks)
  }
  catch(error){
        res.status(500).json(error)

  }
}

// to updte book status-approve book

exports.approveBookContoller = async(req,res)=>{

   const {id}=req.params
   console.log(id);

  try{
  

   const existingBook = await books.findOne({_id:id})

   const updateBook = await books.findByIdAndUpdate({_id:id},{
    title:existingBook.title,
    author:existingBook.author,
    publisher:existingBook.publisher,
    language:existingBook.language,
    noofpages:existingBook.noofpages,
    isbn:existingBook.isbn,
    imageurl:existingBook.imageurl,
    isbn:existingBook.isbn,
    category:existingBook.category,
    price:existingBook.price,
    dprice:existingBook.dprice,
    abstract:existingBook.abstarct,
    uploadimage:existingBook.uploadimage,
    userMail:existingBook.userMail, 
    status:'approved',
    BroughtBy:existingBook.BroughtBy,
    },{new:true})
        
   res.status(200).json(updateBook)

   
  }
  catch(error){
        res.status(500).json(error)

  }
}
