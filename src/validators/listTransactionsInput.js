import { isCuid } from "../helpers.js";

export const listTransactionsInput = async (req, res, next) => {
  const { account_id } = req.query;

  if (account_id === undefined) {
    res.status(400).send({
      status: "error",
      errors: [
        {
          message: "Account is not specified",
          code: "list_transactions__empty_account_id",
        },
      ],
    });
    return;
  }

  if (!isCuid(account_id)) {
    res.status(400).send({
      status: "error",
      errors: [
        {
          message: "Account should be in CUID format",
          code: "account__wrong_format",
        },
      ],
    });
    return;
  }

  next();
};
