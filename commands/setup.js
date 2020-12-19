const mongo = require("../mongo");
const schemareports = require("../schemas/reports-channel-schema");
const modoschema = require("../schemas/modo-roles-schema");
const muteschema = require("../schemas/mute-schema");

exports.run = async (client, message, args) => {
  // check if dm
  if (message.channel.type === "dm") {
    return message.channel
      .send("**⚠️ Cette commande ne peut pas s'effectuer en DM ⚠️** ")
      .then((msg) => {
        message.delete({ timeout: 300 });
        msg.delete({ timeout: 5000 });
      });
  }

  // Check Args
  if (!args[0]) {
    return message.channel
      .send("**⚠️ Vérifier votre commande `setup [type de setup]` ⚠️** ")
      .then((msg) => {
        message.delete({ timeout: 300 });
        msg.delete({ timeout: 5000 });
      });
  }

  // Setup Variable
  const type = args[0].toLowerCase();

  // Check Permission
  if (!message.member.hasPermission("MANAGE_GUILD")) {
    return message.channel
      .send("**Tu n'as pas la permission de faire ça** *(MANAGE_GUILD)*⛔️ ")
      .then((msg) => {
        message.delete({ timeout: 300 });
        msg.delete({ timeout: 5000 });
      });
  }
  // Check type
  if (type !== "report" && type !== "warnrole" && type !== "antispam") {
    return message.channel
      .send(
        "**⚠️ Configuration Incorrecte, config dispo: `report, warnrole, antispam`⚠️** "
      )
      .then((msg) => {
        message.delete({ timeout: 300 });
        msg.delete({ timeout: 5000 });
      });
  }

  if (type === "report") {
    let chan;
    try {
      chan = message.mentions.channels.first().id;
    } catch (error) {
      chan = undefined;
    }
    // Check Channel
    if (chan === undefined) {
      return message.channel
        .send("**⚠️ Salon Introuvable ⚠️** ")
        .then((msg) => {
          message.delete({ timeout: 300 });
          msg.delete({ timeout: 5000 });
        });
    }

    await mongo().then(async (mongoose) => {
      try {
        await schemareports.findOneAndUpdate(
          { _id: message.guild.id },
          { _id: message.guild.id, channelID: chan },
          { upsert: true }
        );
        return message.channel
          .send("**Setup fait avec succès ✅** ")
          .then((msg) => {
            message.delete({ timeout: 300 });
            msg.delete({ timeout: 5000 });
          });
      } catch (error) {
        return message.channel.send(`**ERROR : ${error}** `).then((msg) => {
          message.delete({ timeout: 300 });
          msg.delete({ timeout: 5000 });
        });
      } finally {
        mongoose.connection.close();
      }
    });
  } else if (type === "warnrole") {
    let role;
    try {
      role = message.mentions.roles.first().id;
    } catch (error) {
      role = undefined;
    }
    // Check Channel
    if (role === undefined) {
      return message.channel.send("**⚠️ Role Introuvable ⚠️** ").then((msg) => {
        message.delete({ timeout: 300 });
        msg.delete({ timeout: 5000 });
      });
    }
    await mongo().then(async (mongoose) => {
      try {
        await modoschema.findOneAndUpdate(
          { _id: message.guild.id },
          { _id: message.guild.id, rolemodo: role },
          { upsert: true }
        );
        return message.channel
          .send("**Setup fait avec succès ✅** ")
          .then((msg) => {
            message.delete({ timeout: 300 });
            msg.delete({ timeout: 5000 });
          });
      } catch (error) {
        return message.channel.send(`**ERROR : ${error}** `).then((msg) => {
          message.delete({ timeout: 300 });
          msg.delete({ timeout: 5000 });
        });
      } finally {
        mongoose.connection.close();
      }
    });
  } else if (type === "antispam") {
    let tocheck = false;
    await mongo().then(async (mongoose) => {
      // https://www.youtube.com/watch?v=A1VRitCjL6Y 10:24
      try {
        const guildID = message.guild.id;

        const result = await muteschema.findOne({ _id: guildID });
        tocheck = result.mute;
      } catch (error) {
        tocheck = false;
      } finally {
        mongoose.connection.close();
      }
    });
    if (!tocheck) {
      await mongo().then(async (mongoose) => {
        try {
          await muteschema.findOneAndUpdate(
            { _id: message.guild.id },
            { _id: message.guild.id, mute: true },
            { upsert: true }
          );
          let muterole = message.guild.roles.cache.find(
            (role) => role.name === "muted"
          );
          if (!muterole) {
            try {
              muterole = await message.guild.roles.create({
                data: { name: "muted", permissions: [] },
              });
              message.guild.channels.cache.forEach(async (channel, id) => {
                await channel.createOverwrite(muterole, {
                  SEND_MESSAGES: false,
                  ADD_REACTIONS: false,
                });
              });
            } catch (e) {
              console.log(e);
              message.channel
                .send(
                  "**⚠️ Je n'ai pas la permission modifier les salons et/ou de créer des roles. ⚠️** "
                )
                .then((msg) => {
                  msg.delete({ timeout: 5000 });
                });
            }
          }
          return message.channel
            .send("**Le mode anti spam a été activé✅** ")
            .then((msg) => {
              message.delete({ timeout: 300 });
              msg.delete({ timeout: 5000 });
            });
        } catch (error) {
          return message.channel.send(`**ERROR : ${error}** `).then((msg) => {
            message.delete({ timeout: 300 });
            msg.delete({ timeout: 5000 });
          });
        } finally {
          mongoose.connection.close();
        }
      });
    } else {
      await mongo().then(async (mongoose) => {
        try {
          await muteschema.findOneAndUpdate(
            { _id: message.guild.id },
            { _id: message.guild.id, mute: false },
            { upsert: true }
          );
          return message.channel
            .send("**Le mode anti spam a été désactivé ❌** ")
            .then((msg) => {
              message.delete({ timeout: 300 });
              msg.delete({ timeout: 5000 });
            });
        } catch (error) {
          return message.channel.send(`**ERROR : ${error}** `).then((msg) => {
            message.delete({ timeout: 300 });
            msg.delete({ timeout: 5000 });
          });
        } finally {
          mongoose.connection.close();
        }
      });
    }
  }
};

module.exports.help = {
  name: "setup",
  description: "Configure le bot pour le serveur",
};
