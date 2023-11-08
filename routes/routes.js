const router = require('express').Router();
const users = require('../controllers/user');
const { authorize,authenticateUser,authorizeAdmin } = require('../auth');

router.post('/user/signUp', users.signUp);
router.post('/user/login', users.login);
router.post('/user/updateRole', authenticateUser, authorizeAdmin, users.updateRole);
router.post('/user/createUser',authenticateUser, authorizeAdmin, users.createUser);
router.get('/user/getUser',authenticateUser, users.getUser);
router.put('/user/updateUser',authenticateUser, users.updateUser);
router.post('/user/deleteUser', authenticateUser, authorize, users.deleteUser);
router.post('/user/createAttendance',authenticateUser, users.createAttendance);
router.post('/user/createRoster',authenticateUser, authorize, users.createRoster);
router.post('/user/editRoster',authenticateUser, authorize, users.editRoster);
router.get('/user/viewRoster',authenticateUser, users.viewRoster);
router.get('/user/viewAssignedShiftForStaff', authenticateUser, users.viewAssignedShiftForStaff);
router.post('/user/updateDepartment', authenticateUser,authorizeAdmin, users.updateDepartment);
router.get('/user/getStaffForManager', authenticateUser,authorize, users.getStaffForManager);

module.exports = router;

// Only authenticated managers can create/edit/view the roster.
// Only authenticated staff can mark their attendance.
