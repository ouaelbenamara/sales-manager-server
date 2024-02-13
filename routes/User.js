const express = require('express');
const router = express.Router()
// importing controllers
const { usersController,
    singleUserController,
    registerController,
    updateUserController,
    deleteUserController,
    logInController, 
    logOutController,
    verificationController,
  
    

    protectedController, 
    } = require('../controllers/User');
require('../config/authenticationStrategy');
const { authenticate } = require('../config/authenticationStrategy');

//////////////
router.get('/', usersController)
    .get('/user/:userId',authenticate, singleUserController)
    // .post('/user/:userId/editPassword', editPasswordController)

    .post('/register', registerController)

    .post('/logIn', logInController)
    .get('/protected', authenticate, protectedController)
    .post('/signOut', authenticate, logOutController)
    .get('/verify/:userId/:token',verificationController)
    .put('/update/:userId', authenticate, updateUserController)

    .delete('/delete/:id', authenticate, deleteUserController)

    .all('/*', (req, res) => {
        res.status(404).json({success:false,message:'page not found'})

    })


module.exports = router;