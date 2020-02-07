const { Post, User } = require('../models');
const axios = require('axios');

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
                res.send(result.data[0].trends)
                // res.send(result)
            })
            .catch(err => {
                console.log(err)
                // res.status(404)
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
                console.log(2);
                
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