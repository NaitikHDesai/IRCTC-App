const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, default: '' }, // Add Date of Birth field

    verificationToken: { type: String, default: '' },
    isVerified: { type: Boolean, default: false }
},
    {
        timestamps: true,
    });

const userModal = mongoose.model('users', userSchema);

module.exports = userModal;
