const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
exports.uploadController = async (req, res) => {
    try {
      const userId = req.user.id; // Assume `req.user` is populated via auth middleware
      const avatarUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { avatar: avatarUrl },
      });
  
      res.status(200).json({ message: "Avatar uploaded successfully", avatar: updatedUser.avatar });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to upload avatar" });
    }
};