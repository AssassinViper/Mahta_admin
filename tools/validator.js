const consts = require('../utils/consts');

function hasCode(req, res, params) {

    if (!params.code || params.code <=0 || params.code === "") {
        res.status(consts.BAD_REQ_CODE).json({error: consts.INCORRECT_PARAMS});
        return true;
    }
    return false;
}

function validateSpendCredit(req, res, params) {

    if (!params.code || !params.useFrom || !params.price) {
        res.status(consts.BAD_REQ_CODE)
            .json({
                error: consts.INCORRECT_PARAMS
            });

        return true;
    }

    return false;
}

function addStudent(req, res){

    let {firstName, lastName, grade, field, school, inviterCode, phone, home} = req.body;

    if(firstName === undefined || firstName === "" || firstName.length > 100){

        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_FIRSTNAME});
        return true;
    }

    if(lastName === undefined || lastName === "" || lastName.length > 100){

        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_LASTNAME});
        return true;
    }

    if(grade === undefined || grade === ""){
        
        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_GRADE});
        return true;
    }

    if(field === undefined || field === ""){
        
        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_FIELD});
        return true;
    }

    if(school === undefined || school === "" || school.length > 100){
        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_SCHOOL});
        return true;
    }

    if(phone === undefined || phone === "" || phone === 0 || phone.length !== 11){
        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_PHONE});
        return true;
    }
}

function groupCommit(req, res) {

    let {start, number, gift} = req.body;

    if(start === undefined || start === "" ){

        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_START});
        return true;
    }

    if(number === undefined || number === "" || number === 0){

        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_NUMBER});
        return true;
    }

    if(gift === undefined){

        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_GIFT});
        return true;
    }

}

module.exports = {hasCode, validateSpendCredit, addStudent, groupCommit};

