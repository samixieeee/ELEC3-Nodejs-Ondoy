# ELEC 3 – Node.js

**Name:** Samantha Ondoy
**Section:** IV-BSIT-A
**Course:** ELEC 3 – Node.js
**Instructor:** Carl Gustaf Patrik B. Ferrer
**Date:** 11-21-2026

Node.js activities for Set 1 (N1–N3). Only N1 uses npm packages. N2 and N3 use Node's built-in modules, so they run without `npm install`.

## Activities

| # | Activity | Folder | Description |
|---|---|---|---|
| N1 | Project Setup and Package Management | [set1/n1-setup](set1/n1-setup/) | npm project with chalk (dependency) and Prettier (devDependency); `npm start` prints a message with my name. |
| N2 | Modular Calculator | [set1/n2-calculator](set1/n2-calculator/) | Command-line add, subtract, multiply, divide, and average split across `operations.js`, `formatter.js`, and `index.js`. |
| N3 | File Manager with fs and path | [set1/n3-file-manager](set1/n3-file-manager/) | Create, read, append, delete, and list `.txt` files inside `files/`. |

Written answers: [N1_answers.docx](set1/n1-setup/N1_answers.docx)

## How to run

Requires Node.js (npm is included). Every command block starts in the `ELEC3-Nodejs-Ondoy` folder.

### N1 — Setup

```bash
cd set1/n1-setup
node -v
npm -v
npm install        # rebuilds node_modules from package.json + package-lock.json
npm start
npm run format     # optional: runs Prettier, the devDependency
```

### N2 — Calculator

```bash
cd set1/n2-calculator
node index.js add 12 8
node index.js subtract 20 5 3
node index.js multiply 4 2.5
node index.js divide 10 4
node index.js average 85 90 78
node index.js divide 10 0
node index.js power 2 3
node index.js add 12 abc
```

### N3 — File Manager

```bash
cd set1/n3-file-manager
node index.js create notes.txt "Hello"
node index.js read notes.txt
node index.js update notes.txt "This line was appended."
node index.js create temp.txt "Delete me"
node index.js delete temp.txt
node index.js list
node index.js read temp.txt      # missing file message
```

`files/` contains `about-me.txt`, `notes.txt`, and `todo.txt`, all created with `node index.js create`.

## Screenshots

Every program prints **"Samantha Ondoy (IV-BSIT-A)"** in its first line or startup message.

### N1 — `set1/n1-setup/screenshots/`
- `n1_versions.png` — terminal showing `node -v` and `npm -v`.
- `n1_package_json.png` — `package.json` open in VS Code, with dependencies and devDependencies visible.
- `n1_npm_start.png` — output of `npm start`.

![N1 versions](set1/n1-setup/screenshots/n1_versions.png)
![N1 package.json](set1/n1-setup/screenshots/n1_package_json.png)
![N1 npm start](set1/n1-setup/screenshots/n1_npm_start.png)

### N2 — `set1/n2-calculator/screenshots/`
- `n2_operations.png` — the five operation commands (add, subtract, multiply, divide, average).
- `n2_divide_by_zero.png` — `node index.js divide 10 0`.
- `n2_unknown_operation.png` — `node index.js power 2 3`.

![N2 operations](set1/n2-calculator/screenshots/n2_operations.png)
![N2 divide by zero](set1/n2-calculator/screenshots/n2_divide_by_zero.png)
![N2 unknown operation](set1/n2-calculator/screenshots/n2_unknown_operation.png)

### N3 — `set1/n3-file-manager/screenshots/`
- `n3_create.png` — `node index.js create hello.txt "Hello from Samantha"`
- `n3_read.png` — `node index.js read hello.txt`
- `n3_update.png` — `node index.js update hello.txt "Second line"`
- `n3_delete.png` — `node index.js delete hello.txt`
- `n3_list.png` — `node index.js list`

![N3 create](set1/n3-file-manager/screenshots/n3_create.png)
![N3 read](set1/n3-file-manager/screenshots/n3_read.png)
![N3 update](set1/n3-file-manager/screenshots/n3_update.png)
![N3 delete](set1/n3-file-manager/screenshots/n3_delete.png)
![N3 list](set1/n3-file-manager/screenshots/n3_list.png)
