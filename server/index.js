require("dotenv").config();
const express = require("express");
const session = require("express-session");
const checkForSession = require("./middlewares/checkForSession");
const swagController = require("./controllers/swagController");
const authController = require("./controllers/authController");
const cartController = require("./controllers/cartController");
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

//cart controllers
app.post("/api/cart/checkout", cartController.checkout);
app.post("/api/cart/:id", cartController.add);
app.delete("/api/cart/:id", cartController.delete);



app.post("/api/login", authController.login);
app.post("/api/register", authController.register);
app.post("/api/signout", authController.signout);
app.get("/api/user", authController.getUser);

app.get("/api/swag", swagController.read);

app.listen(SERVER_PORT, () => console.log("Listening on ${SERVER_PORT}."));