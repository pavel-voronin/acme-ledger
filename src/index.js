import express from "express";
import { accounts } from "./services/accounts.js";
import { transfers } from "./services/transfers.js";
import { accountId } from "./validators/accountIdInParams.js";
import { listTransactions } from "./validators/listTransactions.js";
import { newTransaction } from "./validators/newTransaction.js";

const app = express();
app.use(express.json());

const port = process.env.PORT ?? 3000;

app.get("/v1/accounts/:account_id", accountId, async (req, res) => {
  const { account_id } = req.params;

  const account = await accounts.get(account_id);

  if (account === null) {
    res.status(404).send({
      status: "error",
      errors: [{ message: "Account not found", code: "account__not_found" }],
    });
    return;
  }

  res.send(account);
});

app
  .route("/v1/transfers")
  .post(newTransaction, async (req, res) => {
    let { from_account, to_account, amount } = req.body;

    try {
      const transfer = await transfers.create({
        from_account,
        to_account,
        amount,
      });

      res.setHeader("Location", `/v1/transfers/${transfer.tx_id}`);
      res.send(transfer);
    } catch (error) {
      res.status(500).send({
        status: "error",
        errors: [{ message: error.message, code: error.code }],
      });
    }
  })
  .get(listTransactions, async (req, res) => {
    let { account_id } = req.query;

    res.send(await transfers.list(account_id));
  });

app.listen(port, () => {
  console.log(`Server started http://localhost:${port}`);
});
