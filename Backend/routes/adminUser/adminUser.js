const { getUser, deleteUserById, updateUserById } = require('../../controllers/admin/users/userController')
const isAuthenticated = require('../../middleware/isAuthenticated')
const checkRole = require('../../middleware/checkRole')
const catchAsync = require('../../services/catchAsync')

const router = require('express').Router()

router.route('/users').get(isAuthenticated, checkRole('admin'), catchAsync(getUser))
router.route("/users/:id").delete(isAuthenticated, checkRole("admin"), catchAsync(deleteUserById)).patch(isAuthenticated, checkRole("admin"), catchAsync(updateUserById))

module.exports = router