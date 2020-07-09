const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
const router = express.Router();

const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");

const User = require("../models/user.model");
const signToken = (userID) => {
    return JWT.sign(
        {
            iss: "mj",
            sub: userID,
        },
        "mj",
        { expiresIn: "365 days" }
    );
};

const { check, validationResult } = require("express-validator");
const { db } = require("../models/user.model");

router.post(
    "/signup",
    [check("username").isEmail(), check("password").isLength({ min: 5 })],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: { msgBody: "Invalid email" },
                msgError: true,
            });
        }
        const { username, password, usertype } = req.body;

        User.findOne({ username }, (err, user) => {
            if (err) {
                res.status(500).json({
                    message: { msgBody: "Error has occured", msgError: true },
                });
            }
            if (user) {
                res.status(400).json({
                    message: {
                        msgBody: "Username is already taken",
                        msgError: true,
                    },
                });
            } else {
                const newUser = new User({
                    username,
                    password,
                    usertype,
                });

                newUser.save((err) => {
                    if (err) {
                        res.status(500).json({
                            message: {
                                msgBody: "Error has occured",
                                msgError: true,
                            },
                        });
                    } else {
                        res.status(201).json({
                            message: {
                                msgBody: "Account successfully created",
                                msgError: false,
                            },
                        });
                    }
                });
            }
        });
    }
);

router.post(
    "/login",
    [check("username").isEmail(), check("password").isLength({ min: 1 })],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: { msgBody: "Username or password is wrong" },
                msgError: true,
            });
        }
        const { username } = req.body;

        User.findOne({ username }, (error, user) => {
            if (error || !user) {
                return res.status(400).json({
                    message: { msgBody: "User doesn't exists" },
                    msgError: true,
                });
            }
            if (user) {
                user.lastLogin = Date.now();

                User.update({ _id: user._id }, user, function (err, u) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Updated");
                    }
                });
            }
            const { _id } = user._id;
            const { username } = req.body;
            const token = signToken(_id);

            console.log("sign token: " + token);
            res.cookie("access_token", token, {
                httpsOnly: true,
                sameSite: true,
            });
            res.json({
                isAuthenticated: true,
                user: username,
            });
        });
    }
);

router.get(
    "/logout",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        res.clearCookie("access_token");
        res.json({ user: { username: "" }, success: true });
    }
);

router.get(
    "/authenticated",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { username, _id } = req.user;
        res.status(200).json({
            isAuthenticated: true,
            user: username,
            id: _id,
        });
    }
);

router.get("/usertype/:username", async (req, res) => {
    console.log(req.params.username);
    User.findOne({ username: req.params.username }).then((data) => {
        // console.log(data.usertype);

        const findUsertype = async () => {
            return await data.usertype;
        };

        const usertype = findUsertype()
            .then((data) => {
                console.log(data);
                res.status(200).json({ usertype: data });
            })
            .catch((err) => res.status(400).json(err.message));
    });
});

router.get("/lastlogin/:username", async (req, res) => {
    console.log("lastlogin:", req.params.username);
    User.findOne({ username: req.params.username }).then((data) => {
        const findLastLogin = async () => {
            return await data.lastLogin;
        };

        findLastLogin()
            .then((data) => {
                console.log("Login: ", data);
                res.status(200).json({ lastlogin: data });
            })
            .catch((err) => res.status(400).json(err.message));
    });
});
module.exports = router;
