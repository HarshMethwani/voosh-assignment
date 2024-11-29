const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

exports.getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.user.id },
    });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createTask = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        userId: req.user.id,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const task = await prisma.task.update({
      where: { id },
      data: { title, description, status },
    });
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({ where: { id } });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
