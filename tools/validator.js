const consts = require('../utils/consts');

function hasCode(req, res, params) {

    if (!params.code) {
        res.status(consts.BAD_REQ_CODE)
            .json({
                error: consts.INCORRECT_PARAMS
            });

        return true;
    }

    return false;


}

module.exports = {hasCode};

