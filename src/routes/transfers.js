import express from "express";
const router = express.Router();

import { transfers } from "../services/transfers.js";
import { requests } from "../services/requests.js";
import { listTransactionsInput } from "../validators/listTransactionsInput.js";
import { newTransactionInput } from "../validators/newTransactionInput.js";
import { idempotency } from "../middleware/idempotency.js";

router
  .route("/v1/transfers")
  .post(
    newTransactionInput, // validator
    idempotency, // return previously saved response if using the same Idempotency-Key
    async (req, res) => {
      let { from_account, to_account, amount } = req.body;

      try {
        const transfer = await transfers.create({
          from_account,
          to_account,
          amount,
        });

        console.log(
          `Transaction created: ${amount} from ${from_account} to ${to_account}`
        );

        await requests.saveRequest(req, transfer);

        res.setHeader("Location", `/v1/transfers/${transfer.tx_id}`);
        res.send(transfer);
      } catch (error) {
        res.status(500).send({
          status: "error",
          errors: [{ message: error.message, code: error.code }],
        });
      }
    }
  )
  .get(
    listTransactionsInput, // validator
    async (req, res) => {
      let { account_id } = req.query;

      res.send(await transfers.list(account_id));
    }
  );

export { router as transfers };
