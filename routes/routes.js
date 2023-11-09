const router = require('express').Router();
const users = require('../controllers/user');
const roster=require('../controllers/roster');
const attendance = require('../controllers/attendance');
const { authorize,authenticateUser,authorizeAdmin } = require('../auth');

router.post('/user/signUp', users.signUp);
router.post('/user/login', users.login);
router.post('/user/updateRole', authenticateUser, authorizeAdmin, users.updateRole);
router.post('/user/createUser',authenticateUser, authorizeAdmin, users.createUser);
router.get('/user/getUser',authenticateUser, users.getUser);
router.put('/user/updateUser',authenticateUser, users.updateUser);
router.post('/user/deleteUser', authenticateUser, authorize, users.deleteUser);
router.post('/user/createAttendance',authenticateUser, attendance.createAttendance);
router.post('/user/createRoster',authenticateUser, authorize, roster.createRoster);
router.post('/user/editRoster',authenticateUser, authorize, roster.editRoster);
router.get('/user/viewRoster',authenticateUser, roster.viewRoster);
router.get('/user/viewAssignedShiftForStaff', authenticateUser, roster.viewAssignedShiftForStaff);
router.post('/user/updateDepartment', authenticateUser,authorizeAdmin, users.updateDepartment);
router.get('/user/getStaffForManager', authenticateUser,authorize, users.getStaffForManager);

module.exports = router;
