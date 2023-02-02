import express from "express";

import { accounts } from "./routes/accounts.js";
import { transfers } from "./routes/transfers.js";

const port = process.env.PORT ?? 3000;

const app = express();

app.use(express.json());

// Routes

app.use(accounts);
app.use(transfers);

app.listen(port, () => {
  console.log(`Server started http://localhost:${port}`);
});
