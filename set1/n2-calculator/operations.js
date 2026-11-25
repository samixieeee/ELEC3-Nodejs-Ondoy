// Name: Samantha Ondoy
// Section: IV-BSIT-A
// Activity: N2 - Modular Calculator (operations.js)
// Date: 11-21-2026

function add(numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

function subtract(numbers) {
  return numbers.slice(1).reduce((total, n) => total - n, numbers[0]);
}

function multiply(numbers) {
  return numbers.reduce((total, n) => total * n, 1);
}

function divide(numbers) {
  if (numbers.slice(1).includes(0)) {
    throw new Error("Division by zero is not allowed.");
  }
  return numbers.slice(1).reduce((total, n) => total / n, numbers[0]);
}

function average(numbers) {
  return add(numbers) / numbers.length;
}

module.exports = { add, subtract, multiply, divide, average };
