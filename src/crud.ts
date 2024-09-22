import fs from "fs";
import { v4 as uuid } from "uuid";

const DB_FILE_PATH = "./src/db";

interface Todo {
  id: string;
  date: string;
  content: string;
  done: boolean;
}

function create(content: string): Todo {
  // Every todo must be of type Todo (interface)
  const todo: Todo = {
    id: uuid(),
    date: new Date().toISOString(),
    content,
    done: false,
  };

  // The array of todos is an array of Todo objects
  const todos = [
    ...read(), // Include all previous todos being read from the db
    todo,
  ];

  // Save the content in the system
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
    todos,
  }, null, 2));

  return todo;
}

// This function returns an array of todos
function read(): Array<Todo> {
  // Read string content from db in UTF-8 format not Buffer
  const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
  // Parse the string into a JSON object if it exists, or assign db to an empty object
  const db = JSON.parse(dbString || "{}");
  // Fail Fast Validations
  if (!db.todos) {
    return [];
  }
  // If all is OK, return the todos
  return db.todos;
}

function update(id: string, partialTodo: Partial<Todo>): Todo {
  let updatedTodo;
  const todos = read();

  todos.forEach((currentTodo) => {
    const isToUpdate = currentTodo.id === id;
    if (isToUpdate) {
      updatedTodo = Object.assign(currentTodo, partialTodo);
    }
  });

  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
    todos,
  }, null, 2));

  if (!updatedTodo) {
    throw new Error("Please provide a valid ID");
  }
  return updatedTodo;
}

function updateContentById(id: string, content: string): Todo {
  return update(id, {
    content,
  });
}

function clearDB() {
  fs.writeFileSync(DB_FILE_PATH, "");
}

// If you change the content and save (assuming nodemon is enabled), it'll automatically write it to the db file
clearDB();

create("FIRST TODO");
create("SECOND TODO");
const thirdTodo = create("THIRD TODO");

updateContentById(thirdTodo.id, "Updated again!");
console.log(read());
