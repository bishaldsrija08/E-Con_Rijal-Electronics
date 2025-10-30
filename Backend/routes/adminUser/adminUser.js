const { getUser } = require('../../controllers/admin/users/userController')
const isAuthenticated = require('../../middleware/isAuthenticated')
const checkRole = require('../../middleware/checkRole')
const catchAsync = require('../../services/catchAsync')

const router = require('express').Router()

router.route('/users').get(isAuthenticated, checkRole('admin'), catchAsync(getUser))

module.exports = router