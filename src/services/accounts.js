import { prisma } from "../db.js";

export const accounts = {
  async get(account_id) {
    const account = await prisma.accounts.findFirst({
      where: {
        account_id,
      },
    });

    return this.fromDbFormat(account);
  },

  fromDbFormat(account) {
    const result = { ...account };

    result.balance = String(result.balance);

    return result;
  },
};
