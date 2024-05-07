const express = require('express');

const userRouter = express.Router();

const {createUser, signinUser, refetchUser, logoutUser} = require("../controllers/user.controllers")

userRouter.post('/register',createUser)
userRouter.post('/login',signinUser)
userRouter.get('/refetch',refetchUser)
userRouter.get('/logout',logoutUser)

module.exports = userRouter