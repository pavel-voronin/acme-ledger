import { isCuid } from "../helpers.js";

export const accountId = async (req, res, next) => {
  const { account_id } = req.params;

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
