const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploadLectures/')
    },
    filename: function (req, file, cb) {
        console.log('filename', file)
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

const uploadLectures = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        if (
            file.mimetype == 'application/pdf'||
            file.mimetype == 'video/mp4'||
            file.mimetype == 'video/mpeg'||
            file.mimetype == 'video/x-msvideo'
        ) {
            callback(null, true)
        } else {
            callback(null, false);
        }
    },
    // limits: {
    //     fileSize: 1024 * 1024 * 2
    // }
})
module.exports = uploadLectures