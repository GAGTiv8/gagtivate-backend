const { Post, User } = require('../models');
const axios = require('axios');
const { base64_encode } = require('../helpers/base64');

class PostController{
    static findAll(req, res, next) {
        Post.findAll({
            include: [{ model: User }]
        })
            .then(data => {    
                res.status(200).json({
                    data,
                    msg: 'Read Data Post success'
                })
            })
            .catch(next);
    }

    static trends(req, res, next) {
        const token =
            'AAAAAAAAAAAAAAAAAAAAAJV7CQEAAAAAm6NIjWb%2BhDhGjGl8V4zgqVs9L14%3DMNNxR1ThsEXtvOJBJ3RnTQV3pt41dlU1TTJRs0pPemJ4JQnBs6'
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        axios
            .get('https://api.twitter.com/1.1/trends/place.json?id=1', config)
            .then(result => {
                // res.send(result.data[0].trends)
                res.status(200).json({
                    data : result.data[0].trends,
                    msg: 'Read trends success'
                })
            })
            .catch(next);
    }

    static create(req, res, next){
        const options = {
            headers: { Authorization: 'Client-ID 5da6ca0a43b0e11' }
        }
        const image = base64_encode(req.file.path)
        axios
            .post('https://api.imgur.com/3/image', image, options)
            .then(result => {
                // console.log(result.data.data.link)
                // res.send(result.data.data.link)
    
                const data = {
                    title : req.body.title,
                    url : result.data.data.link,
                    tags : req.body.tags,
                    UserId : req.body.UserId
                }
    
                Post.create(data)
                    .then( result => {
                        res.status(201).json({
                            data : result,
                            msg: 'Input Post success'
                        })
                    })
                    .catch(err => {
                        next({
                            name : err.name,
                            msg: err,
                            process : 'Create Post'
                        })
                    });
            })
            .catch(err => {
                next(err)
                res.send('Error!')
            })
    }

    static update(req, res, next) {
        const { id } = req.params;

        const data = {
            title : req.body.title,
            url : req.body.url,
            tags : req.body.tags,
            UserId : req.body.UserId
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
            .catch(next);
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