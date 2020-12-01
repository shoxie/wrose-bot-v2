module.exports = (client, oldPresence, newPresence) => {
  newPresence.member.presence.activities.forEach(async (activity) => {
    if (activity.name === "Spotify") {
      await client.db.spotify.insert(
        activity.details,
        activity.state,
        newPresence.guild.id
      );
      let spotifyData = client.db.spotify.getAllSpotifySongs(newPresence.guild.id);
      client.io.emit("SPOTIFYDATA", spotifyData);
    }
  });
};
