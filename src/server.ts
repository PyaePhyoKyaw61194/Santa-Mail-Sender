import express, { Request, Response } from "express";
import wishCreateContoller from "./controllers/wish.controllers/create.controller";
import sendWishes from "./helpers/sendWishes";
import { Wish } from "./types/wish";
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// Using EJS for View
app.set('view engine', 'ejs');

// Storing wishes as in-memory data within app life-cycle
app.locals.data = {
    wishes: [] as Wish[]
};

// Showing the main page
app.get("/", (_request: Request, response: Response) => {
    return response.render('index');
});

// Post Method for adding wishes from front-end
app.post("/", wishCreateContoller)


// Wish sening as mail process (15 sec interval)
setInterval(() => { sendWishes(app.locals.data.wishes) },
    Number(process.env.MAIL_SEND_INTERVAL) * 1000);

// App Start Point
const PORT = process.env.PORT || 3000
app.listen(process.env.PORT || 3000, () => {
    console.log("Your app is listening on port " + PORT);
});
