// const Discord = require("discord.js");

// const client = new Discord.Client();

// client.on("message", (message) => {
//     message.author.username
// });

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("./collector/db.json");
const db = low(adapter);

// function getRecords() {
//   console.log(db.get("users").take(10).sortBy("count").value());
// }
// getRecords()

let data = db.get("records").value();
let a = []
data.forEach((e) => {
  for (let i = 0; i < e.content.length; i++) {
    let temp_sentence = e.content.split(" ");
    temp_sentence.forEach((w) => {
      if (a.includes(w)) {
        a[a.indexOf(w)].count++;
      } else a.push(w);
    });
  }
});
console.log(mode(a));
function mode(array) {
  if (array.length == 0) return null;
  var modeMap = {};
  var maxEl = array[0],
    maxCount = 1;
  for (var i = 0; i < array.length; i++) {
    var el = array[i];
    if (modeMap[el] == null) modeMap[el] = 1;
    else modeMap[el]++;
    if (modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }
  return maxEl;
}
