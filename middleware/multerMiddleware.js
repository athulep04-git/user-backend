//1 import multer
const multer = require('multer')

//2 setup of destination and filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads') //manually created files
  },
  filename: function (req, file, cb) {
    cb(null, `DOC-${file.originalname}`)
  }
})