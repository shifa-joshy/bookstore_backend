
const books = require("../models/bookModel");
const users = require("../models/userModel");
// import jwt
const jwt = require('jsonwebtoken')





//1) to register a user



exports.registerController = async (req, res) => {

    // logic
    const { username, password, email } = req.body //from frontend
    console.log(username, password, email);
    // res.status(200).json('req received')

    // check user is already exit or not in collecton of mongodb
    try {
        const existingUser = await users.findOne({ email })

        if (existingUser) {
            res.status(406).json('users already exist')
        }
        else {
            const newUser = new users({
                username,
                email,
                password
            })
            // save it to mongodb
            await newUser.save()
            res.status(200).json(newUser)
        }


    }
    catch (error) {
        res.status(500).json(error)
    }


}

//2) to LOGIN A USER
exports.loginContoller = async (req, res) => {
    const { email, password } = req.body //from frontend
    console.log(email, password);

    try {

        // check user is already exit or not in collecton of mongodb

        const existingUser = await users.findOne({ email })

        if (existingUser) {

            if (existingUser.password == password) {
                // token generate
                const token = jwt.sign({ userMail: existingUser.email }, process.env.JWTSECRETKEY)
                res.status(200).json({ existingUser, token })
            }
            else {
                res.status(403).json('Invalid credentials')

            }


        }
        else {
            res.status(406).json('user doest not exist,please register')

        }
    }
    catch (error) {
        res.status(500).json(error)
    }

}



// login via google login method
exports.googleLoginController = async (req, res) => {



    const { username, email, password, photo } = req.body
    console.log(username, email, password, photo);

    try {

        // check user is already exit or not in collecton of mongodb

        const existingUser = await users.findOne({ email })

        if (existingUser) {

            // token generate
            const token = jwt.sign({ userMail: existingUser.email }, process.env.JWTSECRETKEY)

            res.status(200).json({ existingUser, token })

        }

        else {
            // registre this user
            const newUser = new users({
                username,
                email,
                password,
                profile: photo
            })
            // save it to mongodb
            await newUser.save()
            // token generate
            const token = jwt.sign({ userMail: email }, process.env.JWTSECRETKEY)

            res.status(200).json({ existingUser: newUser, token })


        }

        res.status(406).json('user doest not exist,please register')

    }
    catch (error) {
        res.status(500).json(error)

    }
}








// 3) to update user profile
exports.updateProfileController = async (req, res) => {

    const userMail = req.payload
    console.log(userMail);

    const { username, password, bio, profile } = req.body
    console.log(username, password, bio, profile);

    pro = req.file ? req.file.filename : profile
    console.log(pro);
    console.log(req.file);



    try {
        const updateProfile = await users.findOneAndUpdate({ email: userMail }, {
            username,
            email: userMail,
            password,
            bio,
            profile: pro

        }, { new: true })

        res.status(200).json(updateProfile)
    }
    catch (error) {
        res.status(500).json(error)

    }

}










// .................ADMIN...................



//1) to get all useres
exports.getAllUserController = async (req, res) => {

    const query = {
        email: {
            $ne: 'bookstoreadmin@gmail.com'
        }
    }

    try {
        const allUsers = await users.find(query)
        res.status(200).json(allUsers)
    }
    catch (error) {
        res.status(500).json(error)

    }
}



