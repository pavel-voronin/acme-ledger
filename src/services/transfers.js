import { Prisma } from "@prisma/client";
import { prisma } from "../db.js";
import { NotEnoughMoney } from "../errors.js";

export const transfers = {
  async create(transfer) {
    transfer = this.toDbFormat(transfer);

    const { from_account, to_account, amount } = transfer;

    const result = await prisma.$transaction(
      async (tx) => {
        const sender = await tx.accounts.update({
          data: {
            balance: {
              decrement: amount,
            },
          },
          where: {
            account_id: from_account,
          },
        });

        if (sender.balance < 0) {
          throw new NotEnoughMoney(from_account, amount);
        }

        await tx.accounts.update({
          data: {
            balance: {
              increment: amount,
            },
          },
          where: {
            account_id: to_account,
          },
        });

        return await tx.transfers.create({
          data: {
            from_account: {
              connect: {
                account_id: from_account,
              },
            },
            to_account: {
              connect: {
                account_id: to_account,
              },
            },
            amount,
          },
        });
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      }
    );

    return this.fromDbFormat(result);
  },

  toDbFormat({ from_account, to_account, amount }) {
    return {
      from_account,
      to_account,
      amount: parseFloat(amount),
    };
  },

  fromDbFormat(transfer) {
    const result = { ...transfer };

    result.amount = String(result.amount);
    result.created_at = result.created_at.toISOString();

    return result;
  },

  async list(account_id) {
    const transfers = await prisma.transfers.findMany({
      where: {
        OR: [{ from_account_id: account_id }, { to_account_id: account_id }],
      },
      orderBy: {
        created_at: "asc",
      },
    });

    return transfers.map(this.fromDbFormat);
  },
};
