const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the To-Do API');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
let tasks = [];

app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }
    const task = { id: tasks.length + 1, title, description, completed: false };
    tasks.push(task);
    res.status(201).json(task);
});
app.get('/tasks', (req, res) => {
    res.json(tasks);
});
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id !== parseInt(id));
    res.status(200).json({ message: 'Task deleted successfully' });
});
