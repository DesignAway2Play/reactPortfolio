const Profile = require('../models/profile');

module.exports = {
    getProfile,
    create
};

function getProfile(req, res) {
    Profile.find({userId: req.params.id}, function(err, profile) {
        if (err) {
            res.status(404);
        }
        res.status(200).json(profile);
    });
 }
 
 function create(req, res) {
    console.log(req.body);
    Profile.create(req.body, function(err, profile) {
    })
    res.redirect('/');
  }
