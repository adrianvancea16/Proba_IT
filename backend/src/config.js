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
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = new mongoose.model("users", Loginschema);

module.exports = collection;