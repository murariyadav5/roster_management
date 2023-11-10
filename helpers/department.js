const {Department} = require('../models');


const getDepartmentById = async (departmentId) => { 
    return await Department.findOne({_id:departmentId});
}


module.exports = { getDepartmentById}