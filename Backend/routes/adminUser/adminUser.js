const { getUser } = require('../../controllers/admin/users/userController')
const isAuthenticated = require('../../middleware/isAuthenticated')
const restrictTo = require('../../middleware/restrictTo')

const router = require('express').Router()

router.route('/users').get(isAuthenticated, restrictTo('admin'), getUser)


module.exports = router