-- CreateTable
CREATE TABLE "Accounts" (
    "account_id" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "Transfers" (
    "tx_id" TEXT NOT NULL,
    "from_acount_id" TEXT NOT NULL,
    "to_acount_id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transfers_pkey" PRIMARY KEY ("tx_id")
);

-- CreateTable
CREATE TABLE "TransferRequests" (
    "idempotencyKey" VARCHAR(32) NOT NULL,
    "requestBodyHash" CHAR(32) NOT NULL,
    "transfer_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TransferRequests_pkey" PRIMARY KEY ("idempotencyKey")
);

-- AddForeignKey
ALTER TABLE "Transfers" ADD CONSTRAINT "Transfers_from_acount_id_fkey" FOREIGN KEY ("from_acount_id") REFERENCES "Accounts"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfers" ADD CONSTRAINT "Transfers_to_acount_id_fkey" FOREIGN KEY ("to_acount_id") REFERENCES "Accounts"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferRequests" ADD CONSTRAINT "TransferRequests_transfer_id_fkey" FOREIGN KEY ("transfer_id") REFERENCES "Transfers"("tx_id") ON DELETE RESTRICT ON UPDATE CASCADE;
