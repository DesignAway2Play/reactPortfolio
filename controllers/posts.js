const Post = require('../models/post');

module.exports = {
    getAllWorks,
    create
};

function getAllWorks(req, res) {
    Post.find({}, function(err, posts) {
        // if (err) console.log(err);
        // res.status(200).json(posts);
    });
 }
 
 function create(req, res) {
    Post.create(req.body, function(err, post) {
    })
  }

