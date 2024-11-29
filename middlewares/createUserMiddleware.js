const {PrismaClient} = require('@prisma/client') //Import Prisma Client
const prisma = new PrismaClient()// Instantiate Prisma Client
const createUserMiddleware = async (req, res, next) => {
  try {
    let user = await prisma.user.findUnique({ where: { uid: req.uid } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          uid: req.uid,
          email: req.email,
        },
      });
    }
    req.user = user; // Attach user to the request
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = createUserMiddleware;
