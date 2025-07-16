// import express
 const express = require('express')
//  importing the contoller
const useController = require('./controllers/useController')
// import book controller
const bookContoller = require('./controllers/bookController')
// import router specific middleware
const jwt = require('./middleware/jwtMiddleware')
// import imgmulter config
const multerConfic = require('./middleware/multerMiddleware')

// import jon controller
const jobController =require('./controllers/jobController')

// import application controller
const applicationController = require('./controllers/appController')

// import pdfmulter config
const pdfMulterConfic = require('./middleware/pdfMulterMiddleware')


// .....................COOMON ROUTES.....................................................


// create instance with Router clas

const routes =new express.Router()

// set path to controllers to register a user 

routes.post('/register',useController.registerController)

// PATH TO  CONTROLLER to login A USER
routes.post('/login',useController.loginContoller)


// path to get a book to landing page
routes.get('/home-books',bookContoller.homeBookController)


// path to get all JOBS -to admin AND USER  page 

routes.get('/all-jobs',jobController.getAllJobController)


// path to update profiles
routes.put('/edit-profile',jwt,multerConfic.single('profile'),useController.updateProfileController)

// path to google login
routes.post('/google-login',useController.googleLoginController)







// .........USERS SIDE..........................................................................................

// path to add book
routes.post('/add-book',jwt,multerConfic.array('uploadimage',3) , bookContoller.addBookController)



// path to get all books -to allbokk page 
routes.get('/all-books-user',jwt,bookContoller.getAllBookUserContoller)

// path to get a specific book-viewbook page
routes.get('/view-book/:id',bookContoller.viewBookControleer)

// path to get only user added books-profilepage
routes.get('/all-user-added-books',jwt,bookContoller.getAllUserAddedBooksController)

// path to get only user brought books-profilepage

routes.get('/all-user-brought-books',jwt,bookContoller.getAllUserBroughtBooksController)


// path to delete a book -profile page
routes.delete('/delete-book/:id',bookContoller.deleteBookController)


// path to add application form
routes.post('/add-application', jwt, pdfMulterConfic.single('resume')  , applicationController.addApplicationsController)



// path to payment controller
routes.put('/make-payment',jwt,bookContoller.paymentController)







// ...................ADMIN SIDE...................

// path to get all books -to admin page 

routes.get('/all-books',bookContoller.getAllBookContoller)

// path to update book detila-approve book

routes.put('/approve-books/:id',bookContoller.approveBookContoller)

// path to get all users list -to admin page 

routes.get('/all-users',useController.getAllUserController)

// path to add job by admin to db
routes.post('/add-job',jobController.addJobController)

// to remove a job
routes.delete('/delete-job/:id',jobController.deleteJobController)

// path to get all jobapplications to admin page 

routes.get('/all-application',applicationController.getAllApplicationController)








// export 
module.exports =routes