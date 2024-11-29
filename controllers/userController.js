const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
exports.userController = async (req, res) => {
    const { uid } = req.params;
  
    try {
      const user = await prisma.user.findUnique({
        where: { uid },
      });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ avatar: user.avatar });
    } catch (error) {
      console.error("Error fetching avatar:", error);
      res.status(500).json({ message: "Failed to fetch avatar" });
    }
};