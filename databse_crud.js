const express = require('express');
const app = express();
const Database = require('better-sqlite3');
const db = new Database('tasks.db');
const port = 3000;
app.use(express.json());

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const query = `
CREATE TABLE IF NOT EXISTS tasks(
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  done BOOLEAN NOT NULL
)`;

db.exec(query);

//READ
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api', (req, res) => {
  res.json({ name: 'Task API', version: '1.0', endpoints: ['/tasks'] });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/tasks', (req, res) => {
 try { 
  const allTasks = db.prepare('SELECT * FROM tasks').all();
  res.json(allTasks);
 } catch (error) {
  res.status(500).json({ "error": "Internal server error" });
 }  });

app.get('/tasks/:id', (req, res) => {
  try {
    const specificTask = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
    if (!specificTask) {
      return res.status(404).json({ "error": `Task ${req.params.id} not found` });
    }
    res.json(specificTask);
  } catch (error) {
    res.status(500).json({ "error": "Internal server error" });
  }
});


//CREATE
app.post('/tasks', (req, res) => {
  try { 
  if (!req.body || !req.body.title) {
    return res.status(400).json({ "error": "Title is required" });
  }
  
    const newTask = db.prepare('INSERT INTO tasks (title, done) VALUES (?, ?)').run(req.body.title, req.body.done ? 1 : 0);

    res.status(201).json({
      "message": `Done, here's your receipt Created: ${req.body.title}, ${req.body.done ? 1 : 0}`,
    });
  } catch (error) {
    res.status(500).json({ "error": "Internal server error" });
  }
});


//UPDATE
app.put('/tasks/:id', (req, res) => {
  try {
    const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
    if (!task) {
      return res.status(404).json({ "error": `Unknown ID: ${req.params.id}` });
    }
    if (req.body.title === undefined && req.body.done === undefined) {
      return res.status(400).json({ "error": "Empty/Invalid body" });
    }

    const title = req.body.title !== undefined ? req.body.title : task.title;
    const done = req.body.done !== undefined ? (req.body.done ? 1 : 0) : task.done;

    const UpdateTask = db.prepare('UPDATE tasks SET title = ?, done = ? WHERE id = ?').run(title, done, req.params.id);
    return res.json({ id: task.id, title, done });
  } catch (error) {
    return res.status(500).json({ "error": "Internal server error" });
  }
});


//DELETE
app.delete('/tasks/:id', (req, res) => {
  try {
    const DeleteTasks = db.prepare('DELETE FROM tasks WHERE id = ?').run(req.params.id);

    if (DeleteTasks.changes === 0) {
      return res.status(404).json({ "error": `Unknown ID: ${req.params.id}` });
    }                                                                                                   
    return res.json(DeleteTasks);
  } catch (error) {
    return res.status(500).json({ "error": "Internal server error" });
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

