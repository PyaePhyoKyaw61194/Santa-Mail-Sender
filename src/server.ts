import express from "express";

require('dotenv').config();


/* const bodyParser = require("body-parser"); */
import wishCreateContoller from "./controllers/wish.controllers/create.controller";
import sendWishes from "./helpers/sendWishes";


const app = express();
/* app.use(bodyParser()); */
/* app.use(morgan()); */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.locals.data = {
    wishes: []
};

app.get("/", (request, response) => {
    response.render('index');
});

app.post("/", wishCreateContoller)


setInterval(function () { sendWishes(app.locals.data.wishes) }, 15 * 1000);

const PORT = process.env.PORT || 3000
app.listen(process.env.PORT || 3000, function () {
    console.log("Your app is listening on port " + PORT);
});
