import { requests } from "../services/requests.js";

export const idempotency = async (req, res, next) => {
  const idempotencyKey = req.get("Idempotency-Key");

  const request = await requests.findRequestByKey(idempotencyKey);

  if (request === null) {
    next();
    return;
  }

  if (!requests.isBodyTheSame(request, req.body)) {
    res.status(409).send({
      status: "error",
      errors: [
        {
          message: "Body is not the same as before with this Idempotency-Key",
          code: "idempotency_key__diff_body",
        },
      ],
    });
    return;
  }

  res.setHeader("Location", `/v1/transfers/${request.transfer.tx_id}`);
  res.setHeader("X-From-Idempotency", idempotencyKey);
  res.send(request.transfer);
};
