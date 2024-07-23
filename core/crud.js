const fs = require("fs");
const DB_FILE_PATH = "./core/db";

function create(content) {
  // save the content in the system
  fs.writeFileSync(DB_FILE_PATH, content);
  return content;
}

// if you change the content and save (assuming nodemon is enabled), 
// it'll automatically write it to the db file
console.log(create("this is a test"));
