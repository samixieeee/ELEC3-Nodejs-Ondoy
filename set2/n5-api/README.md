# N5 — Students REST-style API

**Samantha Ondoy · IV-BSIT-A · ELEC 3 – Node.js**

A students API built with Node's built-in `http` module. Data is kept in an in-memory array (3 sample students) and resets when the server restarts.

## Run (Windows PowerShell)

Start in the `ELEC3-Nodejs-Ondoy` folder:

```powershell
cd set2\n5-api
node server.js
```

Base URL: `http://localhost:3000`

## Endpoints

| Method | URL | What it does | Success | Errors |
|---|---|---|---|---|
| GET | `/api/students` | Returns all students | 200 | — |
| GET | `/api/students/:id` | Returns one student | 200 | 404 not found, 400 bad id |
| POST | `/api/students` | Adds a student from a JSON body | 201 + new student | 400 malformed JSON / missing fields |
| PUT | `/api/students/:id` | Updates name, course and/or yearLevel | 200 + updated student | 404 not found, 400 bad data |
| DELETE | `/api/students/:id` | Removes a student | 200 + deleted student | 404 not found |

Fields: `name` (text, required on POST), `course` (text, required on POST), `yearLevel` (whole number 1–5, optional, defaults to 1).

## Example request bodies

POST `/api/students`

```json
{ "name": "Samantha Ondoy", "course": "BSIT", "yearLevel": 4 }
```

PUT `/api/students/4` (send only the fields you want to change)

```json
{ "course": "BSIT-A", "yearLevel": 4 }
```

Malformed JSON (for testing the 400 error):

```text
{ "name": "Bad",
```

## Quick test with PowerShell (optional)

Open a second PowerShell window while the server is running:

```powershell
Invoke-RestMethod http://localhost:3000/api/students
Invoke-RestMethod http://localhost:3000/api/students -Method Post -ContentType "application/json" -Body '{"name":"Samantha Ondoy","course":"BSIT","yearLevel":4}'
Invoke-RestMethod http://localhost:3000/api/students/4 -Method Put -ContentType "application/json" -Body '{"yearLevel":4,"course":"BSIT-A"}'
Invoke-RestMethod http://localhost:3000/api/students/4 -Method Delete
```
