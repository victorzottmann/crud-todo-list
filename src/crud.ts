import fs, { readFileSync } from "fs";
const DB_FILE_PATH = "./src/db";

function create(content: string) {
  // save the content in the system
  fs.writeFileSync(DB_FILE_PATH, content);
  return content;
}

function read() {
  const db = fs.readFileSync(DB_FILE_PATH, "utf-8");
  return db;
}

// if you change the content and save (assuming nodemon is enabled), 
// it'll automatically write it to the db file
create("SEGUNDA TODO");
console.log(read());
