module.exports = (client, oldPresence, newPresence) => {
  newPresence.member.presence.activities.forEach(async (activity) => {
    if (activity.name === "Spotify") {
      await client.db.spotify.insert(
        activity.details,
        activity.state,
        newPresence.guild.id
      );
    }
  });
};
