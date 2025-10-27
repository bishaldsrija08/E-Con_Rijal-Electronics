const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // limit mime type
        const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!allowedMimes.includes(file.mimetype)) {
            return cb(new Error('Invalid file type. Only JPEG, PNG and GIF image files are allowed.'));
        }
        cb(null, 'uploads/') //cb(error, success)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname)

    }
})

module.exports = {
    multer,
    storage
}