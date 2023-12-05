const express = require("express");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const router = express.Router();
const {sign}=require("jsonwebtoken");
const { validatetoken } = require("../middleware/middleauth");
router.get('/', (req, res) => {
    res.json("hello");
});

//user registration
router.post('/register', async (req, res) => {
    const { username, fname, lname, gender, phoneno, email, password } = req.body;

    try {
        const phone = await User.findOne({ where: { phoneno: phoneno } });
        const usern = await User.findOne({ where: { username: username } });
        const mail = await User.findOne({ where: { email: email } });

        if (phone) {
            return res.status(400).json({ error: "This phone number is used in another account" });
        }
        if (usern) {
            return res.status(400).json({ error: "Choose a unique username" });
        }
        if (mail) {
            return res.status(400).json({ error: "This email is used in another account" });
        }

        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({
            username: username,
            firstname: fname,
            lastname: lname,
            gender: gender,
            phoneno: phoneno,
            email: email,
            password: hash
        });

        res.status(201).json(user);
    } catch (error) {
        console.error("Error in creating user:", error);
        res.status(500).json({ error: "Could not create user" });
    }
});


//user login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username: username } });

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    bcrypt.compare(password, user.password).then((match) => {
     if (!match) {
        return res.json({ error: "Incorrect password" });
    }
    const Token = sign({username:user.username,id:user.uid},"hellojani")
    res.json({token: Token, username:username,id:user.id});
    // res.json(Token)


});
})

router.get("/auth",validatetoken,async(req,res)=>{
    res.json(req.user)
})


module.exports = router;
