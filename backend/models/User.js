const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        roles: {
            type: [Schema.Types.ObjectId],
            requires: true,
            ref: "Role"
        },
        adresse: {
            type: String
        },
        dateNaissance: {
            type: Date
        },
        genre: {
            type: String
        },
        phone: {
            type: String
        },
        email: {
            type: String
        },
    }
);

module.exports = mongoose.model('User', user);