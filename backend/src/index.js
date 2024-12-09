const express = require("express");
const path = require("path");
const collection = require("./config");
const bcrypt = require('bcrypt');

const app = express();
// convertim datele in format JSON
app.use(express.json());

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
// folosim EJS ca view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

// Register User
app.post("/register", async (req, res) => {

    const data = {
        email: req.body.email,
        password: req.body.password
    };

    // Verificam daca email ul este deja in baza de date
    const existingUser = await collection.findOne({ email: data.email });

    if (existingUser) {
        res.send('Email already exists. Please use a different email.');
    } else {
        // hashuim parola
        const saltRounds = 10; // Numarul de de hashuiri
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword; // Inlocuim parola initiala cu

        const userdata = await collection.insertMany(data);
        console.log(userdata);
        res.send('User registered successfully.');
    }

});

// Login user 
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ email: req.body.email });
        if (!check) {
            res.send("Email not found");
        }
        // Comparam parola hashuita cu cea normala
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (!isPasswordMatch) {
            res.send("Wrong password");
        } else {
            res.render("home");
        }
    } catch {
        res.send("Wrong details");
    }
});

// Definim portul
const port = 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});