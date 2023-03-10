import { isCuid } from "../helpers.js";

export const newTransactionInput = async (req, res, next) => {
  const idempotencyKey = req.get("Idempotency-Key");

  if (idempotencyKey === undefined) {
    res.status(400).send({
      status: "error",
      errors: [
        {
          message: "Specify Idempotency-Key header",
          code: "idempotency_key__not_specified",
        },
      ],
    });
    return;
  }

  if (!/^\w{1,32}$/.test(idempotencyKey)) {
    res.status(400).send({
      status: "error",
      errors: [
        {
          message:
            "Idempotency-Key header should have up to 32 alphanumeric chars",
          code: "idempotency_key__bad_format",
        },
      ],
    });
    return;
  }

  const { from_account, to_account, amount } = req.body;

  if (typeof from_account !== "string" || !isCuid(from_account)) {
    res.status(400).send({
      status: "error",
      errors: [
        {
          message: "`from_account` should be in CUID format",
          code: "account__wrong_format",
        },
      ],
    });
    return;
  }

  if (typeof to_account !== "string" || !isCuid(to_account)) {
    res.status(400).send({
      status: "error",
      errors: [
        {
          message: "`to_account` should be in CUID format",
          code: "account__wrong_format",
        },
      ],
    });
    return;
  }

  if (typeof amount !== "string" || !/^\d+(\.\d{1,6})?$/.test(amount)) {
    res.status(400).send({
      status: "error",
      errors: [
        {
          message: "`amount` should be a number in string",
          code: "amount__wrong_format",
        },
      ],
    });
    return;
  }

  if (parseFloat(amount) < 0) {
    res.status(400).send({
      status: "error",
      errors: [
        {
          message: "`amount` should be positive",
          code: "amount__is_zero_or_negative",
        },
      ],
    });
    return;
  }

  next();
};
