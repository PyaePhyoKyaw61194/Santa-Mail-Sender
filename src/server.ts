import express, { Request, Response } from "express";
import wishCreateContoller from "./controllers/wish.controllers/create.controller";
import sendWishes from "./helpers/sendWishes";
import { Wish } from "./types/wish";
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.locals.data = {
    wishes: [] as Wish[]
};

app.get("/", (_request: Request, response: Response) => {
    response.render('index');
});

app.post("/", wishCreateContoller)


setInterval(() => { sendWishes(app.locals.data.wishes) },
    Number(process.env.MAIL_SEND_INTERVAL) * 1000);

const PORT = process.env.PORT || 3000
app.listen(process.env.PORT || 3000, () => {
    console.log("Your app is listening on port " + PORT);
});
