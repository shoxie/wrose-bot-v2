const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("./collector/db.json");
const db = low(adapter);
const moment = require("moment");
db.defaults({ records: [], users: [], ignoredChannels: [] }).write();
async function count(username, content, userid, guildID, channelID) {
  let check_exist = db.get("ignoredChannels").find({ channelID }).value();
  if (check_exist) return;
  db.get("records")
    .push({
      name: username,
      content: content,
      userid: userid,
      guildID: guildID,
    })
    .write();
  let check = db
    .get("users")
    .find({
      userid: userid,
      guildID: guildID,
      date: moment().format("DD/MM/YYYY"),
    })
    .value();
  if (check === undefined)
    db.get("users")
      .push({
        name: username,
        userid: userid, 
        guildID: guildID,
        count: 1,
        date: moment().format("DD/MM/YYYY"),
      })
      .write();
  else
    db.get("users")
      .find({
        userid: userid,
        guildID: guildID,
        date: moment().format("DD/MM/YYYY"),
      })
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
function addIgnore(id) {
  db.get("ignoredChannels").push(id).write();
}
function getTop10(id = null) {
  if (!id) {
    let data = db.get("users").take(10).sortBy("count").value();
    return data;
  } else {
    let size = db.get("users").size().value(),
      length;
    if (size > 10) length = 10;
    else length = size;
    let data = db
      .get("users")
      .filter({ guildID: id })
      .take(10)
      .sortBy("count")
      .value();
    return data;
  }
}
function getMyChat(userid, guildID) {
  let data = db.get("users").filter({ userid: userid, guildID: guildID }).take(10).value();
  return data;
}
module.exports = {
  count,
  spam,
  db,
  addIgnore,
  getTop10,
  getMyChat,
};
