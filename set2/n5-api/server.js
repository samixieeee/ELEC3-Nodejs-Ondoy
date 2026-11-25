// Name: Samantha Ondoy
// Section: IV-BSIT-A
// Activity: N5 - REST-style API
// Date: 11-21-2026

const http = require("http");

const PORT = 3000;

let students = [
  { id: 1, name: "Kevin Minion", course: "BSIT", yearLevel: 4 },
  { id: 2, name: "Stuart Minion", course: "BSCS", yearLevel: 3 },
  { id: 3, name: "Bob Minion", course: "BSIT", yearLevel: 2 },
];
let nextId = 4;

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data, null, 2));
}

function readJsonBody(req, callback) {
  let raw = "";
  req.on("data", (chunk) => (raw += chunk));
  req.on("end", () => {
    if (raw.trim() === "") {
      return callback(new Error("Request body is empty. Send JSON data."));
    }
    try {
      const data = JSON.parse(raw);
      if (typeof data !== "object" || data === null || Array.isArray(data)) {
        return callback(new Error("Body must be a JSON object, like {\"name\": \"...\"}."));
      }
      callback(null, data);
    } catch (error) {
      callback(new Error("Malformed JSON. Check your quotes, commas, and braces."));
    }
  });
}

function validateStudent(data, requireAll) {
  const errors = [];
  if (requireAll || data.name !== undefined) {
    if (typeof data.name !== "string" || data.name.trim() === "") errors.push("name must be a non-empty text");
  }
  if (requireAll || data.course !== undefined) {
    if (typeof data.course !== "string" || data.course.trim() === "") errors.push("course must be a non-empty text");
  }
  if (data.yearLevel !== undefined) {
    if (!Number.isInteger(data.yearLevel) || data.yearLevel < 1 || data.yearLevel > 5) errors.push("yearLevel must be a whole number from 1 to 5");
  }
  return errors;
}

function findStudent(id) {
  return students.find((s) => s.id === id);
}

function getAllStudents(req, res) {
  sendJson(res, 200, students);
}

function getStudent(req, res, id) {
  const student = findStudent(id);
  if (!student) return sendJson(res, 404, { message: `Student with id ${id} not found` });
  sendJson(res, 200, student);
}

function createStudent(req, res) {
  readJsonBody(req, (error, data) => {
    if (error) return sendJson(res, 400, { message: error.message });
    const errors = validateStudent(data, true);
    if (errors.length) return sendJson(res, 400, { message: "Invalid student data", errors });

    const student = {
      id: nextId++,
      name: data.name.trim(),
      course: data.course.trim(),
      yearLevel: data.yearLevel || 1,
    };
    students.push(student);
    sendJson(res, 201, student);
  });
}

function updateStudent(req, res, id) {
  const student = findStudent(id);
  if (!student) return sendJson(res, 404, { message: `Student with id ${id} not found` });

  readJsonBody(req, (error, data) => {
    if (error) return sendJson(res, 400, { message: error.message });
    const errors = validateStudent(data, false);
    if (errors.length) return sendJson(res, 400, { message: "Invalid student data", errors });

    if (data.name !== undefined) student.name = data.name.trim();
    if (data.course !== undefined) student.course = data.course.trim();
    if (data.yearLevel !== undefined) student.yearLevel = data.yearLevel;
    sendJson(res, 200, student);
  });
}

function deleteStudent(req, res, id) {
  const student = findStudent(id);
  if (!student) return sendJson(res, 404, { message: `Student with id ${id} not found` });
  students = students.filter((s) => s.id !== id);
  sendJson(res, 200, { message: `Student with id ${id} deleted`, student });
}

const server = http.createServer((req, res) => {
  const url = req.url.split("?")[0].replace(/\/+$/, "") || "/";
  const method = req.method;

  if (url === "/") {
    return sendJson(res, 200, { message: "Students API by Samantha Ondoy (IV-BSIT-A). Try GET /api/students" });
  }

  if (url === "/api/students") {
    if (method === "GET") return getAllStudents(req, res);
    if (method === "POST") return createStudent(req, res);
    return sendJson(res, 405, { message: `${method} is not allowed on /api/students` });
  }

  const match = url.match(/^\/api\/students\/([^/]+)$/);
  if (match) {
    const id = Number(match[1]);
    if (!Number.isInteger(id) || id < 1) {
      return sendJson(res, 400, { message: `"${match[1]}" is not a valid student id` });
    }
    if (method === "GET") return getStudent(req, res, id);
    if (method === "PUT") return updateStudent(req, res, id);
    if (method === "DELETE") return deleteStudent(req, res, id);
    return sendJson(res, 405, { message: `${method} is not allowed on /api/students/${id}` });
  }

  sendJson(res, 404, { message: "Route not found" });
});

server.listen(PORT, () => {
  console.log(`Students API by Samantha Ondoy (IV-BSIT-A) running at http://localhost:${PORT}/api/students`);
  console.log("Press Ctrl + C to stop the server.");
});
