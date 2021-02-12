//armazena as rotas http
//recebe os controllers

const { celebrate, Segments, Joi } = require("celebrate");

const userValidator = require("./validators/userValidators");
const liveValidator = require("./validators/liveValidators");
const sessionValidator = require("./validators/sessionValidators");
const classValidator = require("./validators/classValidators");

const express = require("express");
const routes = express.Router();
const knex = require("./database/connection");
const firebase = require("firebase");
const { AuthLogin, AuthCadastro } = require("./models/FirebaseModel");
const { response } = require("express");

//importação dos controllers

const userController = require("./controllers/userController");
const liveController = require("./controllers/liveController");
const sessionController = require("./controllers/sessionController");
const classController = require("./controllers/classController");
const courseController = require("./controllers/courseController");
const organizationController = require("./controllers/organizationController");
const occupationController = require("./controllers/occupationController");
// const lessonController = require("./controllers/lessonController");
// const fileController = require("./controllers/fileController");
// const fileLessonController = require("./controllers/fileLessonController");
const lessonPresenceController = require("./controllers/lessonPresenceController");
// const livePresenceController = require("./controllers/livePresenceController");

const {
  authenticateToken,
  authenticateOptionalToken,
  isAdmin,
  isMaster,
} = require("./middlewares/authentication");

routes.get("/", (request, response) => {
  response.send("eae galerinha xdxxdxdxdxd");
});

// ORGANIZATION -------------------------------------------------------------------------
routes.post("/organization", authenticateToken, organizationController.create);
routes.get("/organization", authenticateToken, organizationController.read);
routes.get(
  "/organization/:id",
  authenticateToken,
  organizationController.getById
);
routes.put("/organization", authenticateToken, organizationController.update);
routes.put(
  "/organization/:id",
  authenticateToken,
  organizationController.delete
);

// OCCUPATION -------------------------------------------------------------------------------
routes.post("/occupation", authenticateToken, occupationController.create);
routes.get("/occupation", authenticateToken, occupationController.read);
routes.get("/occupation/:id", authenticateToken, occupationController.getById);
routes.get("/occupation", authenticateToken, occupationController.update);
routes.get("/occupation/:id", authenticateToken, occupationController.delete);

// COURSE -------------------------------------------------------------------------------
routes.post("/course", authenticateToken, isAdmin, courseController.create);
routes.get("/course/", authenticateToken, isAdmin, courseController.read);
routes.get("/course/:id", authenticateToken, isAdmin, courseController.getById);
routes.delete("/course/:id", authenticateToken, courseController.delete);
routes.put("/course/:id", authenticateToken, isAdmin, courseController.update);

// CLASS ------------------------------------------------------------------------------
routes.post("/class", authenticateToken, classController.create);
routes.get("/class", authenticateToken, classController.read);
routes.get("/class/:id", authenticateToken, classController.getById);
routes.put("/class/:id", authenticateToken, classController.update);
routes.put("/class/:id", authenticateToken, classController.delete);

// // FILE ------------------------------------------------------------------------------
// routes.post("/file", authenticateToken, fileController.create);
// routes.get("/file", authenticateToken, fileController.read);
// routes.get("/file/:id", authenticateToken, fileController.getById);
// routes.put("/file/:id", authenticateToken, fileController.update);
// routes.put("/file/:id", authenticateToken, fileController.delete);

// LESSON -------------------------------------------------------------------------------
// routes.post("/lesson", authenticateToken, lessonController.create);
// routes.get("/lesson", authenticateToken, lessonController.read);
// routes.get("/lesson", authenticateToken, lessonController.getById);
// routes.put("/lesson", authenticateToken, lessonController.update);
// routes.put("/lesson", authenticateToken, lessonController.delete);

// USER -------------------------------------------------------------------------------
routes.post("/user", authenticateOptionalToken, userController.create);
routes.get("/user", authenticateToken, userController.read);
routes.get("/user/:user_id", authenticateToken, userController.getById);
routes.put("/user/:user_id", authenticateToken, userController.update);
routes.put(
  "/user/:user_id",
  authenticateToken,
  isMaster,
  userController.delete
);

// LIVE -----------------------------------------------------------------------------------

routes.post("/live", authenticateToken, liveController.create);
routes.delete("/live/:live_id", authenticateToken, liveController.delete);
routes.get("/live/:live_id", authenticateToken, liveController.getById);
routes.put("/live/:live_id", authenticateToken, liveController.update);

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
  "/lesson/presence",
  authenticateToken,
  lessonPresenceController.delete
);
// live
// routes.post("/live/presence", authenticateToken, livePresenceController.create);
// routes.get("/live/presence", authenticateToken, livePresenceController.read);
// routes.put("/live/presence", authenticateToken, livePresenceController.update);
// routes.delete(
//   "/live/presence",
//   authenticateToken,
//   livePresenceController.delete
// );

module.exports = routes;
