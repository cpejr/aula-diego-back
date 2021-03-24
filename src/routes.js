//armazena as rotas http
//recebe os controllers

const { celebrate, Segments, Joi } = require("celebrate");
const express = require("express");
const routes = express.Router();
const knex = require("./database/connection"); //acho que não precisa disso
const firebase = require("firebase"); //acho que não precisa disso
const { AuthLogin, AuthCadastro } = require("./models/FirebaseModel"); //precisa disso?
const { response } = require("express"); //acho que não precisa disso
const nodemailer = require("nodemailer");

const email = "";
const pass = "";
//pensar em uma forma de criptografar email e senha

// IMOPORT VALIDATORS ------------------------------------------------------------------
const userValidator = require("./validators/userValidators");
const userClassValidator = require("./validators/user_classValidators");
const liveValidator = require("./validators/liveValidators");
const sessionValidator = require("./validators/sessionValidators");
const classValidator = require("./validators/classValidators");
const courseValidator = require("./validators/courseValidators");
const organizationValidator = require("./validators/organizationValidators");
const occupationValidator = require("./validators/occupationValidators");
const lessonValidator = require("./validators/lessonValidators");
const lessonPresenceValidator = require("./validators/lesson_presenceValidators");
const fileLessonValidator = require("./validators/file_lessonValidators");
const fileValidator = require("./validators/fileValidators");
const livePresenceValidator = require("./validators/live_presenceValidators");

//  IMPORT CONTROLLERS -----------------------------------------------------------------

const userController = require("./controllers/userController");
const userClassController = require("./controllers/userClassController");
const liveController = require("./controllers/liveController");
const sessionController = require("./controllers/sessionController");
const classController = require("./controllers/classController");
const courseController = require("./controllers/courseController");
const organizationController = require("./controllers/organizationController");
const occupationController = require("./controllers/occupationController");
const lessonController = require("./controllers/lessonController");
const lessonPresenceController = require("./controllers/lessonPresenceController");
const fileController = require("./controllers/fileController");
const fileLessonController = require("./controllers/fileLessonController");
const videoLessonController = require("./controllers/videoLessonController");
const livePresenceController = require("./controllers/livePresenceController");
const partnerController = require("./controllers/partnerController");
//const fileController = require("./controllers/fileController");

// IMPORT VIEWS -------------------------------------------------------------------------
const createLesson = require("./views/createLesson");
const createClass = require("./views/createClass");

// IMPORT MIDDLEWARES --------------------------------------------------------
const {
  authenticateToken,
  authenticateOptionalToken,
  isAdmin,
  isMaster,
} = require("./middlewares/authentication");

const multer = require("./middlewares/multer");

// TEST ROUTE ---------------------------------------------------------------------------
routes.get("/", (request, response) => {
  response.send("eae galerinha xdxxdxdxdxd");
});

// USUÁRIO -------------------------------------------------------------------------------
routes.post(
  "/newuser",
  authenticateOptionalToken,
  celebrate(userValidator.create),
  userController.create
);
routes.post(
  "/forgottenPassword",
  celebrate(userValidator.forgottenPassword),
  userController.forgottenPassword
);
routes.delete(
  "/deleteUser/:user_id",
  authenticateToken,
  isMaster,
  userController.delete
);
routes.put("/user/:id", authenticateToken, userController.update);

// ORGANIZATION -------------------------------------------------------------------------
routes.post("/organization", authenticateToken, organizationController.create);
routes.get("/organization", authenticateToken, organizationController.read);
routes.get(
  "/organization/:id",
  authenticateToken,
  organizationController.getById
);
routes.put(
  "/organization/:id",
  authenticateToken,
  organizationController.update
);
routes.delete(
  "/organization/:id",
  authenticateToken,
  organizationController.delete
);

// OCCUPATION -------------------------------------------------------------------------------
routes.post("/occupation", authenticateToken, occupationController.create);
routes.get("/occupation", authenticateToken, occupationController.getAll);
routes.get("/occupation/:id", authenticateToken, occupationController.getById);
routes.get("/occupation", authenticateToken, occupationController.update);
routes.put("/occupation/:id", authenticateToken, occupationController.delete);

// COURSE -------------------------------------------------------------------------------
routes.post("/course", authenticateToken, isAdmin, courseController.create);
routes.get("/course", authenticateToken, courseController.read);
routes.get("/course/:id", authenticateToken, courseController.getById);
routes.get(
  "/course/user/:user_id",
  authenticateToken,
  courseController.getByUserId
);
routes.put("/course", authenticateToken, courseController.update);
routes.put("/course/:id", authenticateToken, courseController.delete);

// CLASS ------------------------------------------------------------------------------
routes.post("/class", authenticateToken, classController.create);
routes.get("/class", authenticateToken, classController.read);
routes.get("/class/:id", authenticateToken, classController.getById);
routes.get("/class/users/:id", authenticateToken, classController.getStudents);
routes.put("/class/:id", authenticateToken, classController.update);
routes.put("/class/:id", authenticateToken, classController.delete);

// // FILE ------------------------------------------------------------------------------
//routes.post("/file", authenticateToken, fileController.create);
//routes.get("/file/:id", authenticateToken, fileController.getById);
routes.get("/file_get/:id", authenticateToken, fileController.getFile);
routes.post("/file_upload", authenticateToken, fileController.uploadFile)
// routes.put("/file/:id", authenticateToken, fileController.update);
// routes.put("/file/:id", authenticateToken, fileController.delete);

// LESSON -------------------------------------------------------------------------------
routes.post("/lesson", authenticateToken, lessonController.create);
routes.get("/lesson", authenticateToken, lessonController.read);
routes.get("/lesson/:id", authenticateToken, lessonController.getById);
routes.put("/lesson", authenticateToken, lessonController.update);
routes.delete("/lesson/:id", authenticateToken, lessonController.delete);

// USER -------------------------------------------------------------------------------
routes.post("/user", authenticateOptionalToken, userController.create);
routes.get("/user", authenticateToken, userController.read);
routes.get("/user/:id", authenticateToken, userController.getById);
routes.put("/user/:id", authenticateToken, userController.update);
routes.put("/user/:id", authenticateToken, userController.delete);

// LIVE -----------------------------------------------------------------------------------

routes.post(
  "/live",
  authenticateToken,
  celebrate(liveValidator.create),
  liveController.create
);
routes.get("/live", authenticateToken, liveController.read);
routes.get("/live/:id", authenticateToken, liveController.getById);
routes.put("/live/:id", authenticateToken, liveController.update);
routes.delete("/live/:id", authenticateToken, liveController.delete);

routes.post(
  "/score",
  // authenticateToken,
  livePresenceController.getScore
);
//SESSION ---------------------------------------------------------------------------------

routes.post("/login", sessionController.signin);
routes.get("/verify", sessionController.verifyToken);
routes.post("/forgotpassword", sessionController.forgotPassword);

// PRESENCE-------------------------------------------------------------------------------
// lesson
routes.post(
  "/lesson/presence",
  authenticateToken,
  lessonPresenceController.create
);
routes.get(
  "/lesson/presence",
  authenticateToken,
  lessonPresenceController.read
);
routes.put(
  "/lesson/presence",
  authenticateToken,
  lessonPresenceController.update
);
routes.delete(
  "/lesson/presence/:id",
  authenticateToken,
  lessonPresenceController.delete
);
// live
routes.post("/presence/live", authenticateToken, livePresenceController.create);
routes.get("/presence/live", authenticateToken, livePresenceController.read);
routes.get(
  "/presence/live/:id",
  authenticateToken,
  livePresenceController.getAudience
);
routes.put("/presence/live", authenticateToken, livePresenceController.update);
routes.delete(
  "/presence/live",
  authenticateToken,
  livePresenceController.delete
);

// LINKING TABLES ------------------------------------------------------------------------------------------------------
// fileLesson
routes.post("/lesson_file", authenticateToken, fileLessonController.create);
routes.get("/lesson_file", authenticateToken, fileLessonController.read);
routes.delete(
  "/lesson_file/:id",
  authenticateToken,
  fileLessonController.delete
);

// videoLesson
routes.post("/lesson_video", authenticateToken, videoLessonController.create);
routes.get("/lesson_video", authenticateToken, videoLessonController.read);
routes.delete(
  "/lesson_video/:id",
  authenticateToken,
  videoLessonController.delete
);

// userClass
routes.post("/class/user", authenticateToken, userClassController.create);
routes.get("/class/user", authenticateToken, userClassController.read);
routes.delete(
  "/class/user/:class_id/:user_id",
  authenticateToken,
  userClassController.delete
);

//ENVIAR EMAIL ----------------------------------------------------------------------
routes.get("/sendemail", (response, replyTo, text) => {
  var sender = nodemailer.createTransport({
    host: "SMTP.office365.com",
    //varia com o servidor de emails, testei com o outlook, o gmail é
    //mais chato de mexer por conta da segurança
    port: "587",
    //a porta também varia com o servidor
    auth: {
      user: email,
      pass: pass,
      //precisa do email e senha de uma conta de emails
    },
  });

  var emailSend = {
    from: email,
    to: email,
    replyTo: replyTo,
    //o resplyTo permite que seja possível a pessoa responder o email para o email da pessoa que
    //mandou sem pegar a senha da mesma
    subject: subject,
    text: text,
  };

  sender
    .sendMail(emailSend)
    .then((info) => {
      response.send(info);
    })
    .catch((error) => {
      response.send(error);
    });
});

//COMPLEX ROUTES ------------------------------------------------------------
routes.post("/lesson_create", authenticateToken, createLesson.createLesson);
routes.post("/class_create", authenticateToken, createClass.createClass);

module.exports = routes;
