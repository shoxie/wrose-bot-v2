const mongoose = require("mongoose");
const schema = mongoose.schema({
  artistName: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 1,
  },
});

const artist = mongoose.model("artist", schema);
