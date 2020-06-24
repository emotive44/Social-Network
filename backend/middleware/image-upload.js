const multer = require('multer');
const HttpError = require('../models/httpError-model');


const multerStoragePost = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/posts');
  },
  filename: (req, file, cb) => {
    console.log(file)
    const extension = file.mimetype.split('/')[1];
    cb(null, `post-${req.userId}-${Date.now()}.${extension}`);
  }
});

const multerFilter = (req, file, cb) => {
  if(file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new HttpError('Not a image, please upload only image', 400), false);
  }
}

const uploadPost = multer({
  storage: multerStoragePost,
  fileFilter: multerFilter
});

exports.uploadPostImage = uploadPost.single('image');