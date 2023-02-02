import crypto from "crypto";

export const isCuid = (str) => /^c[a-z0-9]{24}$/.test(str);

export const md5 = (str) => {
  const hash = crypto.createHash("md5").update(str).digest("hex");

  return hash;
};
