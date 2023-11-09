const { Attendance ,Roster} = require('../models');
const { getUserById , getCurrentTimeInHHMMSS} = require('../helpers');

const createAttendance = async (req, res) => {
    try {
      const { userId, imagePath, status ,date} = req.body;
      const currentTime = getCurrentTimeInHHMMSS();
      const user = await getUserById(userId);
          if(!user) throw new Error("User is not valid to update");
      const attendance= await new Attendance({
        userId:user._id,
        imagePath:imagePath,
        status:status,
        date:date,
        punchingTime:currentTime
    }).save();
      await Roster.findOneAndUpdate({userId:userId,date:date},{attendanceId:attendance._id}); // updates attendance in roster
      res.status(200).json({ msg: "Attendance successfully created"});
  } catch(error)  {
      console.log("error",error);
      res.status(400).json({ msg: error.message });
  }
  };

module.exports =  {
    createAttendance,
  };