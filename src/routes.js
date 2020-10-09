//armazena as rotas http
//recebe os controllers

const express = require('express');
const routes = express.Router();

routes.get('/',(request,response)=>{
    response.send('eae galerinha xdxxdxdxdxd');
})

module.exports = routes;