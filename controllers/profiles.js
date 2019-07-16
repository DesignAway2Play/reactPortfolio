const Profile = require('../models/profile');

module.exports = {
    getProfile,
    create
};

function getProfile(req, res) {
    Profile.findbyId(req.user.id, function(err, profile) {
        if (err) console.log(err);
        res.status(200).json(profile);
    });
 }
 
 function create(req, res) {
    Profile.create(req.body, function(err, profile) {
    })
  }
