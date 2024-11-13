import prisma from "../../../../lib/prisma_config";

export class UserRepository {
  static async createUser(email: string, username: string) {
    const user = await prisma.user.create({
      data: {
        email: email,
        name: username,
      },
    });
    return user;
  }

  static async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) return user;
    else return null;
  }
}
