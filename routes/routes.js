const express           = require('express');
const router            = express.Router();
const PostController    = require('../controllers/PostController.js');
const authentication    = require('../middleware/authentication.js');
const authorization     = require('../middleware/authorization.js');

// router.use(authentication);
router.get('/', PostController.findAll);
router.post('/', PostController.create);
router.get('/:id', PostController.findById);
router.put('/:id', PostController.update);
router.delete('/:id', PostController.delete);
router.put('/:id', PostController.update);
router.delete('/:id', PostController.delete);

module.exports = router;