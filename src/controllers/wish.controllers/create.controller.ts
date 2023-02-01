import wishCreateModel from "../../models/wish/create.model";

const wishCreateContoller = async (req, res) => {
    try {
        const wishes = req.app.locals.data.wishes
        const { body } = req;
        const { success, data, error } = await wishCreateModel(body.username, body.wish, wishes);
        if (!success) {
            res.render('error', {
                error: error.message
            });
        }

        res.render('success', {
            message: `${data.username}'s wish has been received. We will send to Santa soon.`
        });
    } catch (err) {

    }
}

export default wishCreateContoller