/*
    Frendz nanti tolong OAuth2Client, audience, 
*/



const { User } = require('../models')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client("471328144693-1247pei37ngnd3klvsrj50g7b9b3eijb.apps.googleusercontent.com") // Nanti 'isi OAuth2Client' tolong dimasukkin ke file dotenv CLIENT_ID= yaps thx

class SigninController {
    static signIn(req, res, next) {
        let token = req.headers.id_token
        let email
        client.verifyIdToken({
            idToken: token,
            audience: "471328144693-1247pei37ngnd3klvsrj50g7b9b3eijb.apps.googleusercontent.com" // Nanti 'isi audience' tolong dimasukkin ke file dotenv CLIENT_ID= yaps thx
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
                        password: `ucul` // Nanti 'ucul' tolong dimasukkin ke file dotenv GOOGLE_PASS='ucul' yaps thx
                    })
                }
                else return data
            })
            .then((data) => {
                let token  = jwt.sign(data.email, 'gulugulu') // Nanti 'gulugulu' tolong dimasukkin ke file dotenv PRIVATE_KEY='gulugulu' yaps thx
                let response = {
                    token,
                    id: data.id
                }
                res.status(200).json(response)
            })
            .catch((err) => {
                next(err)
            })
    }
}

module.exports = SigninController