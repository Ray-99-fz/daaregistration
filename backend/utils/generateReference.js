const crypto = require("crypto");

function generateReference() {
  return `DAA-${crypto.randomBytes(8).toString("hex")}`;
}

module.exports = generateReference;
