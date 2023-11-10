const {Roster} = require('../models');

const getRosterById = async (rosterId) => { 
    return await Roster.findById({_id:rosterId});;
}


module.exports = {getRosterById}