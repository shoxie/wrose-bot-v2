const { updateUsername } = require("../collector/index");
module.exports = (client, oldMember, newMember) => {
  if (oldMember.username !== newMember.username) {
    updateUsername(newMember.id, newMember.username);
  }
};
