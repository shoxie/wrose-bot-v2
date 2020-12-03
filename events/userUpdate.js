const { updateUsername } = require("../collector/index");
module.exports = (client, oldMember, newMember) => {
  if (oldMember.username !== newMember.username) {
    console.log("update");
    updateUsername(newMember.id, newMember.username);
  }
};
