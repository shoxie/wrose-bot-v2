const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("./collector/db.json");
const db = low(adapter);
const moment = require("moment");
db.defaults({ records: [], users: [] }).write();

async function count(username, content, userid, guildID) {
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
        guildID:guildID,
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
function spam(client) {
  setInterval(() => {
    let data1 = db.get("users").take(10).sortBy("count").value();
    let labels = [],
      dataset = [];
    data1.forEach((elem) => {
      labels.push(elem.name);
      dataset.push(elem.count);
    });
    let data2 = {
      labels: labels,
      dataset: dataset,
    };
    client.io.emit("CHARTDATA", data2);
  }, 1500);
}
module.exports = {
  count,
  spam,
  db,
};
