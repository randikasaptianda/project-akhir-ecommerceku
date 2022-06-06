const express = require('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getSingleUser, updateUser, deleteUser, getAllUser } = require('../controllers/userController');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/password/forgot').post(forgotPassword);

router.route('/password/reset/:token').put(resetPassword);

router.route('/logout').get(logout);

router.route('/me').get(isAuthenticatedUser, getUserDetails);

router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), getAllUser);

router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getSingleUser).put(isAuthenticatedUser, authorizeRoles('admin'), updateUser).delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

router.route('/password/update').put(isAuthenticatedUser, updatePassword);

router.route('/me/update').put(isAuthenticatedUser, updateProfile);

module.exports = router;
