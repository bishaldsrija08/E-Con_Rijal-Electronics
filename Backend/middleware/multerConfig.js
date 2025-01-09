const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //check the mimetype of file
    const allowedFileTypes = ["image/png", "image/jpeg"];
    if (!allowedFileTypes.includes(file.mimetype)) {
      cb(new Error("This type is not suported!"));
      return;
    }
    cb(null, "./uploads"); //cb(error, success)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

module.exports = {
  multer,
  storage,
};
