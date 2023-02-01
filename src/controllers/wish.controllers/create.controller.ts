import { Request, Response } from "express";
import wishCreateModel from "../../models/wish/create.model";
import { Wish, WishReqData } from "../../types/wish";

const wishCreateContoller = async (req: Request, res: Response) => {
    try {
        const wishes = req.app.locals.data.wishes as Wish[]
        const { body } = req;
        const { username, wish } = body as WishReqData
        const { success, data, error } = await wishCreateModel(username, wish, wishes);
        if (!success) {
            res.render('error', {
                error: error.message
            });
        }

        res.render('success', {
            message: `${data.username}'s wish has been received. We will send to Santa soon.`
        });
    } catch (err: any) {
        res.render('error', {
            error: err.message
        });
    }
}

export default wishCreateContoller