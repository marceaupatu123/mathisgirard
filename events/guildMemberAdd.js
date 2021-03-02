module.exports = async (client, member) => {
  const mongo = require('../mongo')
  const veskiSchema = require('../schemas/veski-schema')
  const banned = member.guild.roles.cache.find(
    (role) => role.name === "banroled"
  );
  const guildID = member.guild.id
  const memberID = member.id
  const muted = member.guild.roles.cache.find((role) => role.name === "muted");

    await mongo().then(async (mongoose) => {
      try {
        const results = await veskiSchema.findOne({
          guildID,
          memberID
        })
        const ban = results.ban || false
        const mute = results.mute || false
        if (ban == true ) {
          member.roles.add(banned)
          member.send("Tu as cru qu'en revenant tu allais perdre ton ban ? 👀🔨")
        }
        if (mute == true ) {
          member.roles.add(muted)
          member.send("Tu as cru qu'en revenant tu allais perdre ton mute ? 👀🔇")
        }
      } catch (error) {
        console.log(error)
      }
      finally {
        mongoose.connection.close();
      }
    });
};
