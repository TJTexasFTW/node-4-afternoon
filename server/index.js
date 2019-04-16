require(“dotenv”).config();
const express = require("express");
const session = require("express-session");
const checkForSession = require("./middlewares/checkForSession");
const swagController = require("./controllers/swagController");
const app = express();
//Destructuring SERVER_PORT & SESSION_SECRET from process.env
let { SERVER_PORT, SESSION_SECRET } = process.env; 

app.use(express.json());	//this allows us to use the body of the request

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET
})
);

//Adding checkForSession middleware
app.use(checkForSession);

app.get("/api/swag", swagController.read);

app.listen(SERVER_PORT, () => console.log("Listening on ${SERVER_PORT}."));