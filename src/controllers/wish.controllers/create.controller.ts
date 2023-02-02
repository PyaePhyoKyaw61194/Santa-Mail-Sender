import { Request, Response } from "express";
import wishCreateModel from "../../models/wish.models/create.model";
import { Wish, WishReqData } from "../../types/wish";

const wishCreateContoller = async (req: Request, res: Response) => {
    try {

        // Getting in-memory global wish array
        const wishes = req.app.locals.data.wishes as Wish[]


        const { body } = req;
        const { username, wish } = body as WishReqData
        const { success, data, error } = await wishCreateModel(username, wish, wishes);

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