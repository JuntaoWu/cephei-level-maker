import * as fs from 'fs';

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
export let create = async (req, res, next) => {
    try {
        if (req.body.level) {
            let dataUri = req.body.dataUri.split(",")[1];
            fs.writeFileSync(`uploads/${req.body.level}.png`, new Buffer(dataUri, 'base64'));
            return res.json({
                error: false,
                message: "OK",
                data: {}
            });
        }
    }
    catch (ex) {
        console.error(ex);
        return res.json({
            error: true,
            message: ex && ex.message || ex
        });
    }
};

export default { create };