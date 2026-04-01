const express=require('express')

const userController=require('../controllers/userController')

const route=express.Router()

route.post('/api/adduser',userController.addUser)
route.get('/api/getusers',userController.getUsers)
route.put('/api/updateuser/:id',userController.updateUser)
route.delete('/api/deleteuser/:id',userController.deleteUser)
route.post('/api/login',userController.loginUser)
route.get('/api/getAuser/:id',userController.getOneUser)
module.exports=route