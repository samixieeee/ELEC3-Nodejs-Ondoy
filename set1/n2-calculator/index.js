// Name: Samantha Ondoy
// Section: IV-BSIT-A
// Activity: N2 - Modular Calculator (index.js)
// Date: 11-21-2026

const os = require("os");
const path = require("path");
const operations = require("./operations");
const { formatResult, formatError } = require("./formatter");

const scriptName = path.basename(__filename);
const validOperations = Object.keys(operations);

console.log("=== Modular Calculator by Samantha Ondoy (IV-BSIT-A) ===");
console.log(`Running on ${os.type()} (${os.platform()}) as user "${os.userInfo().username}"`);

const operation = (process.argv[2] || "").toLowerCase();
const numberTexts = process.argv.slice(3);

function showUsage() {
  console.log(`Usage: node ${scriptName} <operation> <number1> <number2> ...`);
  console.log(`Operations: ${validOperations.join(", ")}`);
  console.log(`Example:    node ${scriptName} add 12 8`);
}

function main() {
  if (!operation) {
    console.log(formatError("No operation given."));
    showUsage();
    return;
  }
  if (!validOperations.includes(operation)) {
    console.log(formatError(`Unknown operation "${operation}".`));
    showUsage();
    return;
  }
  if (numberTexts.length < 2) {
    console.log(formatError("Please give at least two numbers."));
    showUsage();
    return;
  }

  const numbers = numberTexts.map(Number);
  const badIndex = numbers.findIndex((n, i) => numberTexts[i].trim() === "" || !Number.isFinite(n));
  if (badIndex !== -1) {
    console.log(formatError(`"${numberTexts[badIndex]}" is not a valid number.`));
    return;
  }

  try {
    const result = operations[operation](numbers);
    console.log(formatResult(operation, numbers, result));
  } catch (error) {
    console.log(formatError(error.message));
  }
}

main();
