const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");
const uploadController = require("../controllers/uploadController");
const userController = require("../controllers/userController");

const authMiddleware = require("../middlewares/authMiddleware");
const createUserMiddleware = require("../middlewares/createUserMiddleware");
const upload = require("../middlewares/avatarUpload");

// Middleware for authentication and user management
router.use(authMiddleware);
router.use(createUserMiddleware);

// Task routes
router.get("/", taskController.getTasks);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

// Avatar routes
router.post("/avatar", upload.single("avatar"), uploadController.uploadController);
router.get("/avatar/:uid", userController.userController);

module.exports = router;
