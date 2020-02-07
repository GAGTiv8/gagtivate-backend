const express           = require('express');
const router            = express.Router();
const PostController    = require('../controllers/PostController.js');
const SigninController = require('../controllers/signinController.js')
// const authentication    = require('../middleware/authentication.js');
const authorization     = require('../middleware/authorization.js');
const multer = require('multer');
const axios = require('axios')
const { base64_encode } = require('../helpers/base64');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // CaretPosition   
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        console.log(file.mimetype)
        cb(null, Date.now() + file.originalname)
    }
})
var upload = multer({ storage })

router.post('/signin', SigninController.signIn)
router.get('/', PostController.findAll);
// router.post('/', , PostController.create);

router.post('/', upload.single('image'), (req, res, next) => {
    console.log(req.file)
    const options = {
        headers: { Authorization: 'Client-ID 5da6ca0a43b0e11' }
    }
    const image = base64_encode(req.file.path)
    console.log(image, 1)
    axios
        .post('https://api.imgur.com/3/image', image, options)
        .then(result => {
            console.log(result.data.data.link)
            // res.send(result.data.data.link)

            const data = {
                title : req.body.title,
                url : result.data.data.link,
                tags : req.body.tags,
                UserId : req.body.UserId
            }

            Post.create(data)
                .then( _ => {
                    res.status(201).json({
                        data,
                        msg: 'Input Post success'
                    })
                })
                .catch(err => {
                    next({
                        name : err.name,
                        msg: err.errors[0].message,
                        process : 'Create Post'
                    })
                });
        })
        .catch(err => {
            console.log(err)
            res.send('Error!')
        })
})

router.get('/:id', PostController.findById);
router.put('/:id', PostController.update);
router.delete('/:id', PostController.delete);
router.get('/trends', PostController.trends);

module.exports = router;