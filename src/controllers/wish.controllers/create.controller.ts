import { Request, Response } from "express";
import wishCreateModel from "../../models/wish.models/create.model";
import { TWish, TWishCreate } from "../../validation/wish.validator";


const wishCreateContoller = async (req: Request, res: Response) => {
    try {

        // Getting in-memory global wish array
        const wishes = req.app.locals.data.wishes as TWish[]


        const { body } = req;
        const { username, wish } = body as TWishCreate

        const { success, data, error } = await wishCreateModel({ username, wish }, wishes);

        // If error happens, show error page
        if (!success) {
            return res.render('error', {
                error: error.message
            });

        }

        // If success, show success page
        return res.render('success', {
            message: `${data.username}'s wish has been received. We will send to Santa soon.`
        });

    } catch (err: any) {
        res.render('error', {
            error: err.message
        });
    }
}

export default wishCreateContoller