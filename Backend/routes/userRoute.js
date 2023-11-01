const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const nodemailer = require("nodemailer");
const crypto = require('crypto');
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "naitikcampus@gmail.com",
        pass: "vyjrmzbdbabnaltx",
    },
});

router.post("/signup", async (req, res) => {
    try {
        const newUser = new UserModel(req.body);
        const token = crypto.randomBytes(20).toString("hex");
        newUser.verificationToken = token;

        const savedUser = await newUser.save();

        const mailOptions = {
            from: '"Rail Booking Site" < naitikcampus@gmail.com>',
            to: newUser.email, // Use newUser.email
            subject: "Account Verification",
            text: `Dear User,
            Welcome to Rail Booking Site! Your account has been successfully registered.
            Your Registered details are:
            Email: ${newUser.email}
            Password: ${newUser.password}
            To verify your email, click the following link: http://localhost:3000/verify/${token}`,

            html: `<p>Dear User,</p>
            <p>Welcome to Rail Booking Site! Your account has been successfully registered.</p>
            <p>Your Registered details are:</p>
            <ul>
              <li>Email: ${newUser.email}</li>
              <li>Password: ${newUser.password}</li>
            </ul>
            <p>To verify your email, click the following link: <a href="http://localhost:3000/verify/${token}">Verify Email</a></p>`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error sending verification email:", error);
            } else {
                console.log("Verification email sent:", info.response);
            }
        });
        res.send('User Created Successfully');
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.post("/verify/:token", async (req, res) => {
    const { token } = req.params;
    try {
        const foundUser = await UserModel.findOne({ verificationToken: token });
        if (!foundUser) {
            return res.status(404).send("Verification failed. Token not found.");
        }
        foundUser.isVerified = true;
        await foundUser.save();
        return res.status(200).json({ status: "success" });
    } catch (error) {
        console.error(error);
        return res.status(400).json(error);
    }
});

router.post('/signin', async (req, res) => {
    try {
        const user = await UserModel.findOne({ username: req.body.username, password: req.body.password });
        if (user) {
            res.send(user);
        } else {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.get("/getallusers", async (req, res) => {
    try {
        const users = await UserModel.find();
        res.send(users);
    } catch (error) {
        return res.status(400).json({ error });
    }
});


router.post('/forgetpassword', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            user.password = password;
            await user.save();
            return res.send('Password Updated');
        } else {
            return res.status(400).json({ message: 'Invalid User' });
        }
    } catch (error) {
        return res.status(400).json(error);
    }
});
module.exports = router;
