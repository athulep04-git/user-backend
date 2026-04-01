//1 import multer
const multer = require('multer');

//2 storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // unique name
  }
});

//3 file filter (PDF only)
function fileFilter(req, file, cb) {

  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files allowed"), false); 
  }
}

//4 multer config
const multerConfig = multer({
  storage,
  fileFilter
});

module.exports = multerConfig;