const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createUserMiddleware = async (req, res, next) => {
  try {
    const uid = req.user?.uid; // Extract UID from `authMiddleware`
    const email = req.user?.email; // Extract email from `authMiddleware`

    if (!uid || !email) {
      return res.status(400).json({ message: "UID and email are required" });
    }

    // Check if user exists by UID
    let user = await prisma.user.findUnique({ where: { uid } });

    if (!user) {
      // Check if email already exists to avoid conflict
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }

      // Create new user if UID and email are unique
      user = await prisma.user.create({
        data: {
          uid,
          email,
        },
      });
    }

    req.user = user; // Attach the user to the request object
    next();
  } catch (error) {
    console.error("Error in createUserMiddleware:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = createUserMiddleware;
