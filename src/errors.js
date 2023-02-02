export class NotEnoughMoney extends Error {
  constructor(from_account, amount) {
    super(`${from_account} doesn't have enough to send ${amount}`);
    this.code = "account__not_enough_money";
  }
}
