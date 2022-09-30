const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

const {userSignup,userSignin,addTeacher,favouriteTeacher} = require('../Controllers/userController');

router.post('/signup',userSignup);
router.post('/signin',userSignin);
router.put('/addFavouriteTeacher',[auth],addTeacher);
router.get('/favouriteTeacher',favouriteTeacher);

module.exports=router