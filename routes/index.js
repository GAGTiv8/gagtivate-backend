const router = require('express').Router()
const SigninController = require('../controllers/signinController.js')

router.post('/signin', SigninController.signIn)

module.exports = router