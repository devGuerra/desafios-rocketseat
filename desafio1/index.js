const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

server.use((req, res, next) => {
  console.count("Requests");

  return next();
});

function checkIdExists(req, res, next) {
  const { id } = req.params;

  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: "Project no found." });
  }

  return next();
}

server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  projects.push({ id, title, tasks: [] });

  return res.json({ sucess: "Projeto adicionado." });
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", checkIdExists, (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  const project = projects.find(p => p.id == id);
  project.title = title;

  return res.json(project);
});

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  const findIndex = projects.findIndex(p => p.id == id);

  projects.splice(findIndex, 1);

  return res.json();
});

server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});

server.listen(3000);
