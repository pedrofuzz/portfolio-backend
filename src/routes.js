const express = require("express");
const multer = require("multer");
const uploadConfig = require("./config/upload");

const ProjectController = require("./controllers/ProjectController");
const AuthController = require("./controllers/AuthController");

const authMiddleware = require("./middlewares/AuthMiddleware");

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get("/projects", ProjectController.index);
routes.get("/projects/:project_id", ProjectController.show);

routes.post("/admin/login", AuthController.login);

routes.get("/files/:name", (res, req) => {
  res.status(200);
});

routes.use(authMiddleware).get("/auth", AuthController.authenticated);

routes
  .use(authMiddleware)
  .post("/projects", upload.single("thumbnail"), ProjectController.store);
routes
  .use(authMiddleware)
  .put(
    "/projects/:project_id",
    upload.single("thumbnail"),
    ProjectController.update
  );

routes
  .use(authMiddleware)
  .delete("/projects/:project_id", ProjectController.destroy);

routes.use(authMiddleware).post("/admin/register", AuthController.register);
routes.use(authMiddleware).get("/admin/list", AuthController.index);

module.exports = routes;
