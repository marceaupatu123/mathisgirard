const mongo = require("../mongo");
const functiontools = require("../main");
const warnSchema = require("../schemas/warn-schema");

exports.run = async (client, message, args) => {
  if (message.channel.type == "dm")
    return message.channel
      .send("**⚠️ Cette commande ne peut pas s'effectuer en DM ⚠️** ")
      .then((msg) => {
        message.delete({ timeout: 300 });
        msg.delete({ timeout: 5000 });
      });
  let qui;
  if (!args[0]) {
    qui = message.author;
    args[0] = "je suis une catin";
  } else {
    qui = functiontools.getMoreUsersFromMention(args[0], message);
  }
  if (qui == undefined && args[0].length !== 6) {
    message.channel
      .send("**⚠️ Je ne trouve pas l'utilisateur ⚠️**")
      .then((msg) => {
        message.delete({ timeout: 300 });
        msg.delete({ timeout: 5000 });
      });
    return;
  }

  const guildID = message.guild.id;
  const ticket2 = args[0];
  let tocheck;

  if (args[0].length == 6) {
    await mongo().then(async (mongoose) => {
      try {
        const results = await warnSchema.findOne({
          guildID,
          "warnings.ticket": ticket2,
        });
        let reply = `Avertissements ${ticket2}:\n\n`;

        for (const warns of results.warnings) {
          const { author, timestamp, raison } = warns;

          reply += `Avertissement fait par <@${author}> le ${new Date(
            timestamp
          ).toLocaleDateString()} pour "${raison}"\n\n`;
        }
        message.channel.send(reply);
      } catch (err) {
        tocheck = false;
      } finally {
        mongoose.connection.close();
      }
    });
    if (tocheck == false)
      return message.channel
        .send("**🌀 Cet avertissement n'existe pas 🌀** ")
        .then((msg) => {
          message.delete({ timeout: 300 });
          msg.delete({ timeout: 5000 });
        });
  } else {
    await mongo().then(async (mongoose) => {
      try {
        const results = await warnSchema.findOne({
          guildID,
          memberID: qui.id,
        });

        let reply = `Avertissements de <@${memberID}>:\n\n`;

        for (const warns of results.warnings) {
          const { author, timestamp, raison, ticket } = warns;

          reply += `Avertissement ${ticket} fait par <@${author}> le ${new Date(
            timestamp
          ).toLocaleDateString()} pour "${raison}"\n\n`;
        }

        message.channel.send(reply);
      } catch (err) {
        tocheck = false;
      } finally {
        mongoose.connection.close();
      }
    });
    if (tocheck == false)
      return message.channel
        .send("**🌀 Cette personne ne dispose d'aucun avertissement 🌀** ")
        .then((msg) => {
          message.delete({ timeout: 300 });
          msg.delete({ timeout: 5000 });
        });
  }
};

module.exports.help = {
  name: "checkwarn",
};
