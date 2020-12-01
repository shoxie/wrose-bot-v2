const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("./collector/db.json");
const db = low(adapter);
const moment = require("moment");
db.defaults({ records: [], users: [] }).write();

function run() {
  console.log("1");
  // Set some defaults (required if your JSON file is empty)

  // Add a post
  db.get("users").push({ name: "Uchiha WhiteRose", count: 1 }).write();

  // Set a user using Lodash shorthand syntax
  db.set("user.name", "typicode").write();

  // Increment count
  db.update("count", (n) => n + 1).write();
}
async function count(username, content, userid, guildID) {
  console.log("1");
  db.get("records")
    .push({
      name: username,
      content: content,
      userid: userid,
      guildID: guildID,
    })
    .write();
  let check = db.get("users").find({ userid: userid }).value();
  if (check === undefined)
    db.get("users")
      .push({
        name: username,
        userid: userid,
        count: 1,
        date: moment().format("DD/MM/YYYY"),
      })
      .write();
  else
    db.get("users")
      .find({ userid: userid })
      .update("count", (n) => n + 1)
      .write();
}
module.exports = {
  run,
  count,
};
