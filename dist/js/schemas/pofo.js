const mongoose = require("mongoose");
const projectSchema = require("./project");

const { Schema } = mongoose;
const pofoSchema = new Schema({
    image: String,
    name: String,
    field: String,
    contact: [String],
    about: String,
    projects: [{
        startDate: Date,
        endDate: Date,
        title: String,
        techStack: [String],
        contents: String
    }]
});

module.exports = mongoose.model("Pofo", pofoSchema);