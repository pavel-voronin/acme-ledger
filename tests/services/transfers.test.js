import { describe, it, assert } from "vitest";
import { transfers } from "../../src/services/transfers";

describe(`Transfers service`, () => {
  it(`translates from API format to DB format`, () => {
    const APIFormat = {
      from_account: "cldmt86vb0023356kz6cc10p0",
      to_account: "cjld2cyuq0000t3rmniod1foy",
      amount: "50",
    };
    const DBFormat = transfers.toDbFormat(APIFormat);

    assert(DBFormat.from_account === APIFormat.from_account);
    assert(DBFormat.to_account === APIFormat.to_account);
    assert(DBFormat.amount === 50);
  });

  it(`translates from DB format to API format`, () => {
    const DBFormat = {
      tx_id: "cldmwxqxg0002i07japwqjbch",
      from_account_id: "cjld2cyuq0000t3rmniod1foy",
      to_account_id: "cldmt86vb0023356kz6cc10p0",
      amount: 0.000001,
      created_at: new Date(0),
    };
    const APIFormat = transfers.fromDbFormat(DBFormat);

    assert(APIFormat.tx_id === APIFormat.tx_id);
    assert(APIFormat.from_account === APIFormat.from_account);
    assert(APIFormat.to_account === APIFormat.to_account);
    assert(APIFormat.amount === "0.000001");
    assert(APIFormat.created_at === "1970-01-01T00:00:00.000Z");
  });
});
