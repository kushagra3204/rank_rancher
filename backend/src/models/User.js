const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user'
    },
    fullName: {
        type: String,
    },
    avatar: {
        type: String,
    },
    lastLogin: {
        type: Date,
        default: new Date()
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);