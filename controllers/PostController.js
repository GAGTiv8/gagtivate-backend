const { Post } = require('../models');
const axios = require('axios');

class PostController{
    static findAll(req, res, next) {
        Post.findAll()
        // ({
        //     include: [{ model: User }]
        // })
            .then(data => {    
                res.status(200).json({
                    data,
                    msg: 'Read Data Post success'
                })
            })
            .catch(next);
    }

    static create(req, res, next) {
        const data = {
            title : req.body.title,
            url : req.body.url,
            tags : req.body.tags,
            UserId : req.params.id
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
    }

    static update(req, res, next) {
        const { id } = req.params;

        const data = {
            title : req.body.title,
            url : req.body.url,
            tags : req.body.tags
        }

        Post.update(data, { where : { id }, returning : true} )
            .then(result => {
                if (result[0] > 0) {
                    res.status(200).json({
                        data: result[0][1],
                        msg: 'Update Data Post success'
                    })    
                } else {
                    next({
                        name: 404,
                        msg: 'No updated data Post rows',
                        process: 'Updating Data Post'
                    })
                }
            })
            .catch(next);
    }

    static delete(req, res, next) {
        const { id } = req.params;

        Post.destroy({ where : { id }})
            .then( data => {
                if (data) {
                    res.status(200).json({
                        data,
                        msg: 'Delete Data Post success'
                    })    
                } else {
                    next({
                        name: 404,
                        msg: 'No deleted data Post rows',
                        process: 'Deleting Data Post'
                    })
                }
            })
            .catch( next );
    }

    static findById(req, res, next) {
        const { id } = req.params;

        Post.findByPk(id)
        .then( data => {
                if (data) {
                    res.status(200).json({
                        data,
                        msg: 'Read Data PK Post success'
                    })    
                } else {
                    next({
                        name: 404,
                        msg: 'No result data Post rows',
                        process: 'Find One Row Data'
                    })
                }
            })
            .catch(next);
    }
}

module.exports = PostController;