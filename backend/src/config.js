const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/Login-tut");

// verificarea conexiunii cu baza de date
connect.then(() => {
    console.log("Baza de date conectata");
})
.catch(() => {
    console.log("Database cannot be connected");
});

// Folosim Schema
const Loginschema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
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
    resetPasswordToken: String,
    resetPasswordExpires: Date
});


const collection = new mongoose.model("users", Loginschema);

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photo: {
        type: String // Va stoca calea sau URL-ul fișierului încărcat
    }
});

const Recipe = mongoose.model("recipes", RecipeSchema);

module.exports = {
    collection,
    Recipe
};
