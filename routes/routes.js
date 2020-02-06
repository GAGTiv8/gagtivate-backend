const express           = require('express');
const router            = express.Router();
const PostController    = require('../controllers/PostController.js');
const SigninController = require('../controllers/signinController.js')
// const authentication    = require('../middleware/authentication.js');
const authorization     = require('../middleware/authorization.js');

router.post('/signin', SigninController.signIn)
router.get('/', PostController.findAll);
router.post('/', PostController.create);
router.get('/:id', PostController.findById);
router.put('/:id', PostController.update);
router.delete('/:id', PostController.delete);


module.exports = router;