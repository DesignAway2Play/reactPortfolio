const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema ({
    name: String,
    aboutMe: String,
    isAdmin: Boolean,
    isProfile: Boolean,
    userId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema)