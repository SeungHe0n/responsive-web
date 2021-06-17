const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
    email: { type: String, required: true },
    password: String
});

module.exports = mongoose.model('User', userSchema);
