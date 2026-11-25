// Name: Samantha Ondoy
// Section: IV-BSIT-A
// Activity: N3 - File Manager with fs and path
// Date: 11-21-2026

const fs = require("fs");
const path = require("path");

const FILES_DIR = path.join(__dirname, "files");

const command = (process.argv[2] || "").toLowerCase();
const fileName = process.argv[3];
const text = process.argv.slice(4).join(" ");

console.log("=== File Manager by Samantha Ondoy (IV-BSIT-A) ===");

function getSafePath(name) {
  if (!name) {
    throw new Error("Please give a file name, e.g. notes.txt");
  }
  if (path.basename(name) !== name || name === "." || name === "..") {
    throw new Error("Use a plain file name only (no folders such as ../ or files/).");
  }
  if (path.extname(name).toLowerCase() !== ".txt") {
    throw new Error("Only .txt files are allowed.");
  }
  return path.join(FILES_DIR, name);
}

function createFile(name, content) {
  const filePath = getSafePath(name);
  if (fs.existsSync(filePath)) {
    console.log(`"${name}" already exists. Use "update" to add more text.`);
    return;
  }
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Created: ${filePath}`);
}

function readFile(name) {
  const filePath = getSafePath(name);
  if (!fs.existsSync(filePath)) {
    console.log(`Cannot read "${name}": the file does not exist in files/.`);
    return;
  }
  console.log(`--- ${name} ---`);
  console.log(fs.readFileSync(filePath, "utf8"));
}

function updateFile(name, content) {
  const filePath = getSafePath(name);
  if (!fs.existsSync(filePath)) {
    console.log(`Cannot update "${name}": the file does not exist. Use "create" first.`);
    return;
  }
  fs.appendFileSync(filePath, "\n" + content, "utf8");
  console.log(`Appended text to: ${filePath}`);
}

function deleteFile(name) {
  const filePath = getSafePath(name);
  if (!fs.existsSync(filePath)) {
    console.log(`Cannot delete "${name}": the file does not exist in files/.`);
    return;
  }
  fs.unlinkSync(filePath);
  console.log(`Deleted: ${filePath}`);
}

function listFiles() {
  const names = fs.readdirSync(FILES_DIR).filter((n) => path.extname(n) === ".txt");
  if (names.length === 0) {
    console.log("The files/ folder is empty.");
    return;
  }
  console.log(`Folder: ${FILES_DIR}`);
  names.forEach((name, index) => {
    const filePath = path.join(FILES_DIR, name);
    console.log(`\n#${index + 1}`);
    console.log(`  Full path : ${filePath}`);
    console.log(`  Filename  : ${path.basename(filePath)}`);
    console.log(`  Extension : ${path.extname(filePath)}`);
    console.log(`  Contents  : ${fs.readFileSync(filePath, "utf8").replace(/\n/g, "\n              ")}`);
  });
  console.log(`\nTotal files: ${names.length}`);
}

function showUsage() {
  console.log("Commands:");
  console.log('  node index.js create <file.txt> "text"');
  console.log("  node index.js read   <file.txt>");
  console.log('  node index.js update <file.txt> "text to append"');
  console.log("  node index.js delete <file.txt>");
  console.log("  node index.js list");
}

function main() {
  if (!fs.existsSync(FILES_DIR)) {
    fs.mkdirSync(FILES_DIR);
  }

  try {
    if (command === "create") {
      if (!text) throw new Error('Please give the text, e.g. create notes.txt "Hello"');
      createFile(fileName, text);
    } else if (command === "read") {
      readFile(fileName);
    } else if (command === "update") {
      if (!text) throw new Error('Please give the text to append, e.g. update notes.txt "More"');
      updateFile(fileName, text);
    } else if (command === "delete") {
      deleteFile(fileName);
    } else if (command === "list") {
      listFiles();
    } else {
      console.log(command ? `Unknown command "${command}".` : "No command given.");
      showUsage();
    }
  } catch (error) {
    console.log(`ERROR: ${error.message}`);
  }
}

main();
