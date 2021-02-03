//armazena as rotas http
//recebe os controllers

const { celebrate, Segments, Joi } = require("celebrate");

const userValidator = require("./validators/userValidators");
const liveValidator = require("./validators/liveValidators");
const sessionValidator = require("./validators/sessionValidators");
const classValidator = require("./validators/classValidators");
const occupationValidator = require("./validators/occupationValidators");

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
const ClassController = require("./controllers/classController");
const OccupationController = require("./controllers/occupationController");

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
  authenticateOptionalToken,
  celebrate(userValidator.create),
  UserController.createUser
);
routes.delete(
  "/deleteUser/:user_id",
  authenticateToken,
  isMaster,
  UserController.delete
);
routes.put("/user/:user_id", authenticateToken, UserController.updateStudent);
routes.get(
  "/user/:user_id",
  authenticateToken,
  // isAdmin, // isso terá que ser alterado depois. o user deve ser capaz de pegar sua própria informação
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

// CLASS -----------------------------------------------------------------------------------

routes.post(
  "/newclass",
  authenticateToken,
  isAdmin,
  celebrate(classValidator.create),
  ClassController.create
);
routes.delete(
  "/deleteClass/:class_id",
  authenticateToken,
  isAdmin,
  celebrate(classValidator.delete),
  ClassController.delete
);
routes.get(
  "/class/:class_id",
  authenticateToken,
  isAdmin,
  ClassController.getById
);
routes.get(
  "/allcompany",
  authenticateToken,
  isAdmin,
  ClassController.getAllByCompany
);
routes.put(
  "/updateclass/:class_id",
  authenticateToken,
  isAdmin,
  celebrate(classValidator.update),
  ClassController.update
);

// OCCUPATION -------------------------------------------------------------------------------

routes.post(
  "/newoccupation",
  authenticateToken,
  isAdmin,
  celebrate(occupationValidator.create),
  OccupationController.create
);
routes.delete(
  "/deleteOccupation/:id",
  authenticateToken,
  isAdmin,
  celebrate(occupationValidator.delete),
  OccupationController.delete
);
routes.get(
  "/occupation/:id",
  authenticateToken,
  isAdmin,
  OccupationController.getById
);
routes.get(
  "/allorganization",
  authenticateToken,
  isAdmin,
  OccupationController.getAllByOrganization
);
routes.put(
  "/updateoccupation/:id",
  authenticateToken,
  isAdmin,
  celebrate(occupationValidator.update),
  OccupationController.update
);

module.exports = routes;