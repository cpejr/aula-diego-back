//armazena as rotas http
//recebe os controllers

const { celebrate, Segments, Joi } = require('celebrate');

const userValidator = require("./validators/userValidators")
const liveValidator = require("./validators/liveValidators")

const express = require('express');
const routes = express.Router();
const knex = require('./database/connection')
const firebase = require('firebase');
const {AuthLogin,AuthCadastro} = require('./models/FirebaseModel');
const { response } = require('express');




//importação dos controllers

const UserController = require('./controllers/userController')
const LiveController = require('./controllers/liveController')
const SessionController = require('./controllers/sessionController');
const { authenticateToken,authenticateOptionalToken,isAdmin,isMaster } = require('./middlewares/authentication');



routes.get('/', (request, response) => {
  response.send('eae galerinha xdxxdxdxdxd');
})





// USUÁRIO -------------------------------------------------------------------------------



routes.post('/newuser' ,celebrate(userValidator.create),UserController.createUser)
routes.delete('/deleteUserStudent/:user_id', UserController.deleteStudent)
routes.put('/user/:user_id',UserController.updateStudent)
routes.get('/user/:user_id',UserController.getOneUser)
routes.get('/allstudent',UserController.getAllStudent)
routes.get('/alladmin',UserController.getAllAdmin)
routes.put('/promote/:user_id' ,UserController.promote)
routes.put('/demote/:user_id', UserController.demote)




// LIVE -----------------------------------------------------------------------------------

routes.post('/newlive', celebrate(liveValidator.create),LiveController.create)
routes.delete('/deleteLive/:live_id',celebrate(liveValidator.deletelive), LiveController.delete)
routes.get('/readlive/:live_id', LiveController.read)
routes.put('/updatelive/:live_id',celebrate(liveValidator.uptade), LiveController.update)


//SESSION ---------------------------------------------------------------------------------

routes.post('/login', SessionController.signin );
routes.get('/verify', SessionController.verifyToken);
routes.post('/forgotpassword', SessionController.forgotPassword);




module.exports = routes
