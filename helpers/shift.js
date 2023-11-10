const {Shift} = require('../models');


const getShiftDetails = async (shiftType) => { 
    return await Shift.findOne({shift:shiftType});
}


module.exports = { getShiftDetails }