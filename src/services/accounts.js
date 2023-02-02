import { prisma } from "../db.js";

export const accounts = {
  get: async (account_id) => {
    return prisma.accounts.findFirst({
      where: {
        account_id,
      },
    });
  },
};
