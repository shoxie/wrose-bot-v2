const mongoose = require("mongoose");
const songSchema = mongoose.Schema({
  song_name: { type: String },
  guildID: { type: String },
  count: {
    type: Number,
    default: 1,
  },
});
const song = mongoose.model("spotifyCount", songSchema);

async function check_exists(name, guildID) {
  return song
    .findOne({ song_name: name, guildID: guildID }, function (err, res) {
      if (err) console.log("no result");
      // console.log(res);
    })
    .exec();
}
async function insert(name, guildID) {
  let check = await check_exists(name, guildID);
  if (check === null) {
    let newsong = new song({
      song_name: name,
      guildID: guildID,
    });
    await newsong.save().then(() => {
      console.log("saved song for " + name);
    });
  } else {
    await check.update({ $inc: { count: 1 } });
  }
}
module.exports = {
  check_exists,
  insert,
};
