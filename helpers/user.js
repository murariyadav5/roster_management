const { User ,Shift,Roster,Department} = require('../models');

const getUserById = async (userId) => { 
    return await User.findById(userId);;
}

const getRosterById = async (rosterId) => { 
    return await Roster.findById({_id:rosterId});;
}

const getShiftDetails = async (shiftType) => { 
    return await Shift.findOne({shift:shiftType});
}
const getDepartmentById = async (departmentId) => { 
    return await Department.findOne({_id:departmentId});
}



module.exports = { getUserById,getShiftDetails ,getRosterById,getDepartmentById}


