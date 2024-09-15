import fs from "fs";
const DB_FILE_PATH = "./src/db";

interface Todo {
  date: string;
  content: string;
  done: boolean;
}

function create(content: string) {
  // Every todo must be of type Todo (interface)
  const todo: Todo = {
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
    dogs: [],
  }, null, 2));
  return content;
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

function clearDB() {
  fs.writeFileSync(DB_FILE_PATH, "");
}

// If you change the content and save (assuming nodemon is enabled), it'll automatically write it to the db file
clearDB();
create("FIRST TODO");
create("SECOND TODO");
create("THIRD TODO");
console.log(read());
