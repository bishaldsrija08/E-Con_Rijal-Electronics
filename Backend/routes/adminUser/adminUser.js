const { getUser, deleteUser } = require('../../controllers/admin/users/userController')
const isAuthenticated = require('../../middleware/isAuthenticated')
const restrictTo = require('../../middleware/restrictTo')

const router = require('express').Router()

router.route('/users').get(isAuthenticated, restrictTo('admin'), getUser)

router.route('/users/:id').delete(isAuthenticated, restrictTo('admin'), deleteUser)

module.exports = router