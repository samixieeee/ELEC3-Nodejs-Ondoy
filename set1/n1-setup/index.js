// Name: Samantha Ondoy
// Section: IV-BSIT-A
// Activity: N1 - Project Setup and Package Management
// Date: 11-21-2026

const chalk = require("chalk");
const packageInfo = require("./package.json");

console.log(
  chalk.green.bold(
    "Hello! This project was set up by Samantha Ondoy (IV-BSIT-A).",
  ),
);
console.log(chalk.cyan(`Project: ${packageInfo.name} v${packageInfo.version}`));
console.log(chalk.yellow(`Running on Node.js ${process.version}`));
console.log(
  'Tip: run "npm run format" to tidy this file with Prettier (devDependency).',
);
