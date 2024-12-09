const express = require("express");
const path = require("path");
const { collection, Recipe } = require("./config");
const bcrypt = require('bcrypt');
const multer = require("multer");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const session = require("express-session");

// Configurare multer pentru a salva fișierele cu un nume clar
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Stochează fișierele în folderul uploads
    },
    filename: function (req, file, cb) {
        // Folosim numele rețetei și extensia originală a fișierului
        const recipeName = req.body.name.replace(/\s+/g, '-'); // înlocuim spațiile cu cratime
        const fileExtension = path.extname(file.originalname); // obținem extensia fișierului
        cb(null, `${recipeName}${fileExtension}`); // Numele fișierului va fi format din numele rețetei + extensia fișierului
    }
});

const upload = multer({ storage: storage });

const app = express();

app.use(session({
    secret: 'your-secret-key', // Cheia secretă pentru semnătura sesiunii
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Setează true doar dacă folosești https
}));

// Servește fișierele din directorul uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Convertim datele în format JSON
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// Folosim EJS ca view engine
app.set("view engine", "ejs");

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/add-recipe", (req, res) => {
    res.render("add-recipe");
});

app.post("/add-recipe", upload.single("photo"), async (req, res) => {
    const { name, description } = req.body;

    // Verificăm dacă fișierul a fost încărcat
    if (!req.file) {
        return res.status(400).send("No photo uploaded.");
    }

    // Numele fișierului încărcat va fi bazat pe numele rețetei
    const photoFileName = req.file.filename; 

    const recipe = new Recipe({
        name,
        description,
        photo: photoFileName // Salvează doar numele fișierului
    });

    try {
        await recipe.save();
        res.send(`Recipe added successfully! Uploaded photo: ${photoFileName}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error saving recipe.");
    }
});


app.get("/forgot-password", (req, res) => {
    res.render("forgot-password");
});

app.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

    const user = await collection.findOne({ email });
    if (!user) {
        return res.render("forgot-password", { errorMessage: "Email not found." });
    }

    // Generăm un token de resetare
    const token = crypto.randomBytes(32).toString("hex");
    const resetPasswordExpires = Date.now() + 3600000; // 1 oră

    user.resetPasswordToken = token;
    user.resetPasswordExpires = resetPasswordExpires;
    await user.save();

    // Configurare transport email
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'probaitchefit@gmail.com',
            pass: 'bwpv tfaw yahm tqii'
        }
    });

    const resetLink = `http://localhost:5000/reset-password/${token}`;
    const mailOptions = {
        to: user.email,
        from: 'passwordreset@example.com',
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
              `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
              `${resetLink}\n\n` +
              `If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    await transporter.sendMail(mailOptions);
    res.send("An email has been sent to reset your password.");
});

app.get("/reset-password/:token", async (req, res) => {
    const user = await collection.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
        return res.send("Password reset token is invalid or has expired.");
    }

    res.render("reset-password", { token: req.params.token });
});

app.post("/reset-password/:token", async (req, res) => {
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.send("Passwords do not match.");
    }

    const user = await collection.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
        return res.send("Password reset token is invalid or has expired.");
    }

    // Hashuim parola nouă
    const saltRounds = 10;
    user.password = await bcrypt.hash(password, saltRounds);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.send("Your password has been updated.");
});

// Register User
app.post("/register", async (req, res) => {
    const { fullName, telephone, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.send('Passwords do not match. Please try again.');
    }

    // Verificăm dacă emailul este deja în baza de date
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
        return res.send('Email already exists. Please use a different email.');
    }

    // Hashuim parola
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Pregătim datele pentru inserare
    const newUser = {
        fullName,
        telephone,
        email,
        password: hashedPassword
    };

    try {
        const userdata = await collection.insertMany(newUser);
        console.log(userdata);
        res.send('User registered successfully.');
    } catch (error) {
        console.error(error);
        res.send('Error registering user. Please try again.');
    }
});

// Login user 
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ email: req.body.email });
        if (!check) {
            return res.send("Email not found");
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (!isPasswordMatch) {
            return res.send("Wrong password");
        }

        // Stocăm utilizatorul în sesiune
        req.session.user = {
            id: check._id,
            fullName: check.fullName,
            email: check.email,
            telephone: check.telephone
        };

        res.render("home");
    } catch (error) {
        console.error(error);
        res.send("Wrong details");
    }
});

app.get("/home", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login");  // Redirecționează la login dacă utilizatorul nu este logat
    }
    res.render("home", { user: req.session.user });
});

app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send("Error logging out.");
        }
        res.redirect("/login");
    });
});

app.get("/profile", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login"); // Dacă utilizatorul nu este logat, îl redirecționezi la login
    }
    
    res.render("profile", { user: req.session.user }); // Trimite datele utilizatorului la pagina de profil
});

app.get("/recipes", async (req, res) => {
    try {
        const recipes = await Recipe.find(); // Preia toate rețetele din baza de date
        res.render("recipes", { recipes }); // Trimite datele către pagina "recipes"
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching recipes.");
    }
});


// Definim portul
const port = 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
