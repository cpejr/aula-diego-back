//armazena as rotas http
//recebe os controllers

const { celebrate, Segments, Joi } = require('celebrate');

const userValidator = require("./validators/userValidators")

const express = require('express');
const routes = express.Router();
const knex = require('./database/connection')
const firebase = require('firebase');
const {AuthLogin,AuthCadastro} = require('./models/FirebaseModel');
const { response } = require('express');

routes.get('/', (request, response) => {
  response.send('eae galerinha xdxxdxdxdxd');
})

routes.get('/aluno/index', async (request, response) => {
  const alunos = await knex('alunos').select('*')

  response.json(alunos);
})

routes.get('/aluno/:matricula', async (request, response) => {
  const matricula = 123456
  const alunos = await knex('alunos').where('matricula', matricula)

  response.json(alunos);
})


routes.post('/aluno/create', async (request, response) => {
  const { nome, matricula, curso } = request.body

  const id = await knex('alunos').insert({ nome, matricula, curso })

  response.json(id);
})






// USUÁRIO --------------------------------------------------------------------------------

routes.post('/newuser', //celebrate(userValidator.create),



(request, response) => {
  let getBody = request.body;
  AuthCadastro.createNewUser(getBody.email, getBody.password)
  .then((login)=> {
    if(!login.err){
      response.send('foi deu certo kkkkkkkkkk')
    }else{
      console.log("nao foi");
    }
  })
})



routes.post('/login', 

(request, response) => {
  let getBody = request.body;
  AuthLogin.createSession(getBody.email, getBody.password)
  .then((login)=> {
    if(!login.err){
      response.send('logou meu ')
    }else{
      console.log("nao foi");
    }
  })
})



routes.delete('/deleteuser/:user_id', //celebrate(userValidator.deleteUser),

(request, response) => {
  console.log("Deletado")
})




routes.put("user/:user_id", //celebrate(userValidator.update),
(request, response) => {
  response.send("Atualizou");
})



routes.get("/getuser/:user_id", (request, response) => {
  response.send("Fez o get");
})

routes.delete("/deleteadmin/:user_id", //celebrate(userValidator.deleteAdmin))
(request, response) => {
  response.send("Fez o get");}
)


module.exports = routes
