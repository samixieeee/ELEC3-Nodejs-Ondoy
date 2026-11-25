// Name: Samantha Ondoy
// Section: IV-BSIT-A
// Activity: N2 - Modular Calculator (formatter.js)
// Date: 11-21-2026

const SYMBOLS = { add: "+", subtract: "-", multiply: "x", divide: "/" };

function formatNumber(value) {
  return Number(value.toFixed(4)).toString();
}

function formatResult(operation, numbers, result) {
  if (operation === "average") {
    return `Average of [${numbers.join(", ")}] = ${formatNumber(result)}`;
  }
  return `${numbers.join(` ${SYMBOLS[operation]} `)} = ${formatNumber(result)}`;
}

function formatError(message) {
  return `ERROR: ${message}`;
}

module.exports = { formatResult, formatError };
