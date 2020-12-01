const mongoose = require("mongoose");
const songSchema = mongoose.Schema({
  song_name: { type: String },
  artist: { type: String },
  guildID: { type: Number },
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
async function insert(name, artistname, guildID) {
  let check = await check_exists(name, guildID);
  if (check === null) {
    let newsong = new song({
      song_name: name,
      guildID: guildID,
      artist: artistname,
    });
    await newsong.save().then(() => {
      console.log("saved song for " + name);
    });
  } else {
    await check.update({ $inc: { count: 1 } });
  }
}
async function getAllSpotifySongs(guildID = null) {
  if (guildID) {
    let a = await song.find({ guildID: guildID }).sort({ count: -1 }).exec();
    let array = [];
    a.forEach((song) => {
      array.push(song);
    });
    return array;
  } else {
    let a = await song.find().sort({ count: -1 }).exec();
    let array = [];
    a.forEach((song) => {
      array.push(song);
    });
    return array;
  }
}
module.exports = {
  check_exists,
  insert,
  getAllSpotifySongs,
};
