# Acme: Ledger/Wallet API 

For this project, you will be building a ledger/wallet API that can accept and process transactions between internal
accounts. You can initiate the app with some fixtures to have accounts with balances above zero.

You may work using all the tools and reference materials that you usually use. You may use any 3rd party libraries, but
please be ready to justify their usage and explain their inner workings. When you're done, zip up your project directory
and share it with us.

Please don't spend more than 4 hours on this project.

## Functional requirements

* Endpoints (JSON/REST):
  * Get account details
  ```json
  {
    "id": "{account_id}", 
    "available_balance":  "{amount}",
     //other fields you think required here
  } 
  ```
  * Submit a transaction between accounts for certain amount
  ```json
  {
    "from_account":  "{account_id}",
    "to_account":  "{account_id}",
    "amount": "1.05",
     //other fields you think required here
  } 
  ```
  * Get all records for the given account
  ```json
  [
    {
      "id": "{transaction_id}",
      "account_id":  "{account_id}",
      "amount": "1.05",
      "created_at": "{datetime|timestamp}"
      //other fields you think required here
    },
    //... more transactions
  ] 
  ```
* No user authentication required

## Non functional requirements

* Solution should run in docker environment (docker-compose/kubernetes)
* Use Postgres for the storage layer
* App should be scalable and allow multiple docker containers running (2, 5, 100?..)
* You can make your own assumptions and compromises as long as you understand the trade-offs and will be able to
  articulate those in documentation

## Expectations

We would like to see:

* Idiomatic and self-explanatory code without documenting each line
* Understanding of RDBMs fundamentals and basic principles (ACID, Transactions Isolation Levels, Locks, etc)
* Idempotency in action and resistance to human/machine errors
* Testable code with some tests you think will be crucial for the app
* Architecture that can evolve into something bigger
* Reasonable level of documentation (how to launch, monitor, debug, etc)
