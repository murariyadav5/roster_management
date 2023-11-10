const { Roster} = require('../models');
const { getUserById,getRosterById} = require('../helpers');

const createRoster=async(req, res) => {
    try{
      const { userId, shift, workingDay, date } = req.body;
      const user = await getUserById(userId);
          if(!user) throw new Error("User is not valid to create Roster");
          await new Roster({
        userId:userId,
        shiftId:shift,
        workingDay:workingDay,
        date:date
    }).save();
      res.status(200).json({ msg: "Roster created successfully"});
    }catch(error)  {
      console.log("error",error);
      res.status(400).json({ msg: error.message });
  }
  };
  
  const editRoster=async(req, res) => {
    try{
      const { rosterId } = req.body;
      console.log("hi");
      const roster = await getRosterById(rosterId);
      console.log(roster);
          if(!roster) throw new Error("roster is not valid");
      await Roster.findOneAndUpdate({_id:rosterId}, req.body);
      res.status(200).json({ msg: "Roster edited successfully"});
    }catch(error)  {
      console.log("error",error);
      res.status(400).json({ msg: error.message });
  }
  };
  
  const viewRoster=async(req, res) => {
    try{
      const { rosterId } = req.query;
      const roster = await getRosterById(rosterId);
          if(!roster) throw new Error("roster is not valid");
      res.status(200).json({ roster: roster });
    }catch(error)  {
      console.log("error",error);
      res.status(400).json({ msg: error.message });
  }
  };

  const viewAssignedShiftForStaff=async(req, res) => {
    try{
      const { userId } = req.query;
      const user = await getUserById(userId);
      if(!user) throw new Error("User is not valid");
      let roster;
      if(req.body.date){
        roster=await Roster.findOne({ userId: userId ,date:req.body.date});
      }else{
        roster = await Roster.findOne({ userId: userId});
      }
       if(!roster) throw new Error("User doesn't have any assigned shift");
      res.status(200).json({ assignedShiftDetails: roster });
    }catch(error)  {
      console.log("error",error);
      res.status(400).json({ msg: error.message });
  }
  };

module.exports =  { 
    createRoster,
    editRoster,
    viewRoster,
    viewAssignedShiftForStaff
  };