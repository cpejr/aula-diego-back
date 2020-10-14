const express = require('express');
const routes = require('./routes');
const firebase = require('firebase');
const Auth = require('../src/models/firebase.js');
const cors = require('cors');
require('dotenv').config();
let userLogged;

const app = express();
app.use(cors());
app.use(express.json())

firebase.auth().onAuthStateChanged((user) => {
    if(user){
        userLogged = user;
    } else {
        userLogged = null;
    }
})



app.use(routes);

app.listen('6969');