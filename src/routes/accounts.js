import express from "express";
const router = express.Router();

import { accounts } from "../services/accounts.js";
import { getAccountInput } from "../validators/getAccountInput.js";

router.route("/v1/accounts/:account_id").get(
  getAccountInput, // validator
  async (req, res) => {
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
  }
);

export { router as accounts };
