const { prismaMock } = require('../singleton');
const taskController = require('../controllers/taskController');

describe('Task Controller', () => {
  describe('getTasks', () => {
    it('should fetch tasks for the authenticated user', async () => {
      const mockTasks = [
        { id: '1', title: 'Task 1', description: 'Description 1', userId: 'user1' },
        { id: '2', title: 'Task 2', description: 'Description 2', userId: 'user1' },
      ];

      // Mock prisma.task.findMany
      prismaMock.task.findMany.mockResolvedValue(mockTasks);

      const req = { user: { id: 'user1' } }; // Simulate request object
      const res = { json: jest.fn() }; // Mock response object

      await taskController.getTasks(req, res);

      expect(prismaMock.task.findMany).toHaveBeenCalledWith({
        where: { userId: 'user1' },
      });
      expect(res.json).toHaveBeenCalledWith(mockTasks);
    });
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      const newTask = { title: 'New Task', description: 'New Description', userId: 'user1' };

      // Mock prisma.task.create
      prismaMock.task.create.mockResolvedValue({ id: '1', ...newTask });

      const req = { body: newTask, user: { id: 'user1' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await taskController.createTask(req, res);

      expect(prismaMock.task.create).toHaveBeenCalledWith({
        data: newTask,
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: '1', ...newTask });
    });
  });

  describe('updateTask', () => {
    it('should update an existing task', async () => {
      const updatedTask = { id: '1', title: 'Updated Task', description: 'Updated Description' };

      // Mock prisma.task.update
      prismaMock.task.update.mockResolvedValue(updatedTask);

      const req = { params: { id: '1' }, body: updatedTask };
      const res = { json: jest.fn() };

      await taskController.updateTask(req, res);

      expect(prismaMock.task.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updatedTask,
      });
      expect(res.json).toHaveBeenCalledWith(updatedTask);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      prismaMock.task.delete.mockResolvedValue({ id: '1' });

      const req = { params: { id: '1' } };
      const res = { json: jest.fn() };

      await taskController.deleteTask(req, res);

      expect(prismaMock.task.delete).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(res.json).toHaveBeenCalledWith({ message: 'Task deleted' });
    });
  });
});
