const mongoose = require("mongoose");

let schema = mongoose.Schema({
  songName: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 1,
  },
  guildID: {
    type: Number,
    required: true,
  },
});

var song = mongoose.model("song", schema);

async function check_exists(name, guildID) {
  return song
    .findOne({ songName: name, guildID: guildID }, function (err, res) {
      if (err) console.log("no result");
      // console.log(res);
    })
    .exec();
}

async function insert(name, guildID) {
  let check = await check_exists(name, guildID);
  if (check === null) {
    let newsong = new song({
      songName: name,
      guildID: guildID,
    });
    await newsong.save().then(() => {
      "saved song for " + name;
    });
  } else {
    await check.update({ $inc: { count: 1 } });
  }
}

module.exports = {
  check_exists,
  insert,
};
