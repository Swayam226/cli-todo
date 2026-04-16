const fs = require("fs");
const { Command } = require("commander");
const { json } = require("stream/consumers");
const program = new Command();

program
    .name('CLI ToDo')
    .description('a simple cli based todo app')
    .version('1.0.0');
program.command('add')
    .description("add a new task")
    .argument('<task>', 'add the task you desire')
    .action((task) => {
        let todos = [];

        try {
            const data = fs.readFileSync('todos.json', 'utf-8');
            const todos = JSON.parse(data);
        } catch (err) {
            todos = [];
        }
        todos.push({ task, done: false });
        fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2));
        console.log("task added");
    })
program.command('remove')
    .description("remove a task")
    .argument('<task>', 'remove the task you desire')
    .action((task) => {
        const data = fs.readFileSync('todos.json', 'utf-8');
        let todos = JSON.parse(data);
        todos = todos.filter(t => t.task !== task);
        fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2));
        console.log("task removed");

    })
program.command('done')
    .description("complete a task")
    .argument('<task>', 'declare a task complete')
    .action((task) => {
        const data = fs.readFileSync('todos.json', 'utf-8');
        const todos = JSON.parse(data);
        const todo = todos.find(t => t.task === task);
        if (todo) {
            todo.done = true;
            fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2));
            console.log("task marked as done")
        } else {
            console.log("task not found");
        }
    })

program.parse();