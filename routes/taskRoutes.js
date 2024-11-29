const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const createUserMiddleware = require('../middlewares/createUserMiddleware');

router.use(authMiddleware);
router.use(createUserMiddleware);

router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
