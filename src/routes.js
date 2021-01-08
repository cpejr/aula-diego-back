//armazena as rotas http
//recebe os controllers

const { celebrate, Segments, Joi } = require("celebrate");

const userValidator = require("./validators/userValidators");
const liveValidator = require("./validators/liveValidators");
const sessionValidator = require("./validators/sessionValidators");

const express = require("express");
const routes = express.Router();
const knex = require("./database/connection");
const firebase = require("firebase");
const { AuthLogin, AuthCadastro } = require("./models/FirebaseModel");
const { response } = require("express");

//importação dos controllers

const UserController = require("./controllers/userController");
const LiveController = require("./controllers/liveController");
const SessionController = require("./controllers/sessionController");
const {
  authenticateToken,
  authenticateOptionalToken,
  isAdmin,
  isMaster,
} = require("./middlewares/authentication");

routes.get("/", (request, response) => {
  response.send("eae galerinha xdxxdxdxdxd");
});

// USUÁRIO -------------------------------------------------------------------------------

routes.post(
  "/newuser",
  celebrate(userValidator.create),
  UserController.createUser
);
routes.delete(
  "/deleteUserStudent/:user_id",
  authenticateToken,
  isMaster,
  UserController.deleteStudent
);
routes.put("/user/:user_id", authenticateToken, UserController.updateStudent);
routes.get(
  "/user/:user_id",
  authenticateToken,
  isAdmin,
  UserController.getOneUser
);
routes.get(
  "/allstudent",
  authenticateToken,
  isAdmin,
  UserController.getAllStudent
);
routes.get(
  "/alladmin",
  authenticateToken,
  isMaster,
  UserController.getAllAdmin
);
routes.put(
  "/promote/:user_id",
  authenticateToken,
  isMaster,
  UserController.promote
);
routes.put(
  "/demote/:user_id",
  authenticateToken,
  isMaster,
  UserController.demote
);

// LIVE -----------------------------------------------------------------------------------

routes.post(
  "/newlive",
  authenticateToken,
  isAdmin,
  celebrate(liveValidator.create),
  LiveController.create
);
routes.delete(
  "/deleteLive/:live_id",
  authenticateToken,
  isAdmin,
  celebrate(liveValidator.deletelive),
  LiveController.delete
);
routes.get(
  "/readlive/:live_id",
  authenticateToken,
  isAdmin,
  LiveController.read
);
routes.put(
  "/updatelive/:live_id",
  authenticateToken,
  isAdmin,
  celebrate(liveValidator.uptade),
  LiveController.update
);

//SESSION ---------------------------------------------------------------------------------

routes.post(
  "/login",
  celebrate(sessionValidator.login),
  SessionController.signin
);
routes.get(
  "/verify",
  celebrate(sessionValidator.verifyToken),
  SessionController.verifyToken
);
routes.post(
  "/forgotpassword",
  celebrate(sessionValidator.forgotPassword),
  SessionController.forgotPassword
);

module.exports = routes;
