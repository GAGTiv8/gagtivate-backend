const { User } = require('../models')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID)

class SigninController {
    static signIn(req, res, next) {
        let token = req.headers.id_token
        let email
        client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        })
            .then((data) => {
                email = data.payload.email
                return User.findOne({
                    where: {
                        email
                    }
                })
            })
            .then((data) => {
                if(!data) {
                    return User.create({
                        email,
                        password: process.env.GOOGLE_PASS
                    })
                }
                else return data
            })
            .then((data) => {
                let token  = jwt.sign(data.email, process.env.PRIVATE_KEY)
                let response = {
                    token,
                    id: data.id
                }
                res.status(200).json(response)
            })
            .catch((err) => {
                console.log(err)
                next(err)
            })
    }
}

module.exports = SigninController