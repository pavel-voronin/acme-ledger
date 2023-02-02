import { prisma } from "../db.js";
import { md5 } from "../helpers.js";

export const requests = {
  async findRequestByKey(idempotencyKey) {
    return await prisma.transferRequests.findFirst({
      where: {
        idempotencyKey,
      },
      include: {
        transfer: true,
      },
    });
  },

  isBodyTheSame(request, body) {
    const { from_account, to_account, amount } = body;

    const requestBodyHash = md5(
      JSON.stringify({ from_account, to_account, amount })
    );

    return request.requestBodyHash === requestBodyHash;
  },

  async saveRequest(req, transfer) {
    const { from_account, to_account, amount } = req.body;

    const idempotencyKey = req.get("Idempotency-Key");

    const hash = md5(JSON.stringify({ from_account, to_account, amount }));

    await prisma.transferRequests.create({
      data: {
        requestBodyHash: hash,
        idempotencyKey,
        transfer: {
          connect: {
            tx_id: transfer.tx_id,
          },
        },
      },
    });
  },
};
