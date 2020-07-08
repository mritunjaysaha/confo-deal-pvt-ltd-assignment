const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const path = require("path");
const app = express();
const port = process.env.PORT || 8000;

require("dotenv").config();
app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.join(__dirname, "client", "build")));
const uri = process.env.MONGODB_URI || process.env.URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

const userRouter = require("./routes/user");
app.use("/user", userRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
