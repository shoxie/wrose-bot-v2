// const Discord = require("discord.js");
// require("dotenv").config();
// const client = new Discord.Client();

// client.on("message", async (message) => {
//   let { id, username } = await client.users.fetch(message.author.id);
//   console.log(id, username);
// });
// client.login(process.env.token);
// const low = require("lowdb");
// const FileSync = require("lowdb/adapters/FileSync");

// const adapter = new FileSync("./collector/db.json");
// const db = low(adapter);

// let data = db.get('users')
// var data = db
//   .get("users")
//   .find({ guildID: "335604901730058243" })
//   .take(10)
//   .value();
// console.log(data);
// function getRecords() {
//   let data = db.get("users").take(10).sortBy("count").value();
//   let labels = [],
//     dataset = [];
//   data.forEach((elem) => {
//     labels.push(elem.name);
//     dataset.push(elem.count);
//   });
//   let package = {
//     labels: labels,
//     dataset: dataset,
//   };
//   console.log(package);
// }
// getRecords();

// let data = db.get("records").value();
// let a = []
// data.forEach((e) => {
//   for (let i = 0; i < e.content.length; i++) {
//     let temp_sentence = e.content.split(" ");
//     temp_sentence.forEach((w) => {
//        a.push(w);
//     });
//   }
// });
// console.log(mode(a));
// function mode(array) {
//   if (array.length == 0) return null;
//   var modeMap = {};
//   var maxEl = array[0],
//     maxCount = 1;
//   for (var i = 0; i < array.length; i++) {
//     var el = array[i];
//     if (modeMap[el] == null) modeMap[el] = 1;
//     else modeMap[el]++;
//     if (modeMap[el] > maxCount) {
//       maxEl = el;
//       maxCount = modeMap[el];
//     }
//   }
//   return maxEl;
// }
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://thinhdeptrai:thinhdeptrai123@ds261072.mlab.com:61072/testfc",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("CONNECTED DIT CON ME MAY");
  });
