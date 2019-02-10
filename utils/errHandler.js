const consts = require('./consts');

module.exports = function (err, res) {

    console.log(`errHandler: \n ${err}`);

    res.status(consts.INT_ERR_CODE)
        .json({
            error: consts.ERR
        });

};