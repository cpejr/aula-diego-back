//armazena as rotas http
//recebe os controllers

const express = require('express');
const routes = express.Router();
const knex = require('./database/connection')
const firebase = require('firebase');
const Auth = require('./models/firebase');

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


routes.post('/login', (request, response) => {
  let getBody = request.body;
  firebase.auth().signInWithEmailAndPassword(getBody.email, getBody.password)
  .then((login)=> {
    if(login.err){
      console.log("foi");
    }else{
      console.log("nao foi");
    }
  })
})


module.exports = routes;
