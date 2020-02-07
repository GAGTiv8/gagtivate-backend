const express           = require('express');
const router            = express.Router();
const PostController    = require('../controllers/PostController.js');
const SigninController = require('../controllers/signinController.js')
// const authentication    = require('../middleware/authentication.js');
const authorization     = require('../middleware/authorization.js');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // CaretPosition   
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
var upload = multer({ storage })

router.post('/signin', SigninController.signIn)
router.get('/', PostController.findAll);
router.post('/', upload.single('image'), PostController.create);
router.get('/trends', PostController.trends);
router.get('/:id', PostController.findById);
router.put('/:id', PostController.update);
router.delete('/:id', PostController.delete);


module.exports = router;