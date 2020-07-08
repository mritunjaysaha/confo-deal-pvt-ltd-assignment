const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
const router = express.Router();

const passport = require("passport");
const passportConfig = require("../passport");
const Jwt = require("jsonwebtoken");

const User = require("../models/user-model");

const signToken = (userID) => {
    return Jwt.sign(
        {
            iss: "mj",
            sub: userID,
        },
        "mj",
        { expiresIn: "365 days" }
    );
};

const { check, validationResult } = require("express-validator");

router.post(
    "/signup",
    [check("username").isEmail(), check("password").isLength({ min: 5 })],
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: { msgBody: "Invalid Email" },
                msgError: true,
            });
        }
        const { username, password, usertype } = req.body;

        User.findOne({ username }, (err, user) => {
            if (err) {
                res.status(500).json({
                    message: { msgBody: "Error has occured" },
                    msgError: true,
                });
            }

            if (user) {
                res.status(400).json({
                    message: { msgBody: "Username is already taken" },
                    msgError: true,
                });
            } else {
                const newUser = new User({ username, password, usertype });

                newUser.save((err) => {
                    if (err) {
                        res.status(500).json({
                            message: {
                                msgBody: "Account successfully created",
                            },
                            msgError: false,
                        });
                    } else {
                        res.status(201).json({
                            message: {
                                msgBody: "Account successfully created",
                            },
                            msgError: false,
                        });
                    }
                });
            }
        });
    }
);
module.exports = router;
