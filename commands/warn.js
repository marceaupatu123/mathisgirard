const mongo = require("../mongo");
const functiontools = require("../main");
const warnSchema = require("../schemas/warn-schema");
const modoschema = require("../schemas/modo-roles-schema");
const Discord = require("discord.js");

function makeid(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

exports.run = async (client, message, args) => {

  let tocheck = true
  await mongo().then(async (mongoose) => {
    // https://www.youtube.com/watch?v=A1VRitCjL6Y 10:24
    try {
      const guildID = message.guild.id;

      const result = await modoschema.findOne({
        _id: guildID
      });
      tocheck = result.rolemodo;
    } catch (error) {
      tocheck = false;
    } finally {
      mongoose.connection.close();
    }
  });

  if (tocheck == false)
    return message.channel
      .send(
        "**⚠️ Veuillez demander à un administrateur de setup les roles modérateurs avec la commande `setup warnrole [role]`⚠️** "
      )
      .then((msg) => {
        message.delete({
          timeout: 300
        });
        msg.delete({
          timeout: 5000
        });
      });
  if (message.member.roles.cache.get(tocheck)) {
    const emojisiren = client.emojis.cache.get("777979795816185916")
    if (message.channel.type == "dm")
      return message.channel
        .send("**⚠️ Cette commande ne peut pas s'effectuer en DM ⚠️** ")
        .then((msg) => {
          message.delete({
            timeout: 300
          });
          msg.delete({
            timeout: 5000
          });
        });

    if (!args[0] || !args[1])
      return message.channel
        .send("**⚠️ Vérifier votre commande `warn [membre] [raison]` ⚠️** ")
        .then((msg) => {
          message.delete({
            timeout: 300
          });
          msg.delete({
            timeout: 5000
          });
        });
    const qui = functiontools.getMoreUsersFromMention(args[0], message);
    if (qui == undefined) {
      message.channel
        .send("**⚠️ Je ne trouve pas l'utilisateur ⚠️**")
        .then((msg) => {
          message.delete({
            timeout: 300
          });
          msg.delete({
            timeout: 5000
          });
        });
      return;
    } else if (qui == false) {
      message.channel
        .send("**⚠️ Veuillez spécifier un destinataire ⚠️**")
        .then((msg) => {
          message.delete({
            timeout: 300
          });
          msg.delete({
            timeout: 5000
          });
        });
      return;
    }
    if (Array.isArray(qui) == true) {
      qui.forEach(async(element) => {
    const raison = args.slice(1).join(" ");
    const guildID = message.guild.id;
    const memberID = element.id;
    const ticket = makeid(6);
    const warning = {
      author: message.member.user.id,
      timestamp: new Date().getTime(),
      ticket,
      raison,
    };
    let tocheck = true;

    await mongo().then(async (mongoose) => {
      try {
            await warnSchema.findOneAndUpdate({
              guildID,
              memberID,
            }, {
              guildID,
              memberID,
              $push: {
                warnings: warning,
              },
            }, {
              upsert: true,
            });
      } catch (error) {
        tocheck = false;
      } finally {
        mongoose.connection.close();
      }
    });
  })
} else {
  const raison = args.slice(1).join(" ");
    const guildID = message.guild.id;
    const memberID = qui.id;
    const ticket = makeid(6);
    const warning = {
      author: message.member.user.id,
      timestamp: new Date().getTime(),
      ticket,
      raison,
    };
    let tocheck = true;

    await mongo().then(async (mongoose) => {
      try {
            await warnSchema.findOneAndUpdate({
              guildID,
              memberID,
            }, {
              guildID,
              memberID,
              $push: {
                warnings: warning,
              },
            }, {
              upsert: true,
            });
      } catch (error) {
        tocheck = false;
      } finally {
        mongoose.connection.close();
      }
    });
}

    if (tocheck == false) return;

    const embed = new Discord.MessageEmbed()
      .setTitle(`Avertissement "${ticket}"`)
      .setAuthor(
        `${message.guild.name}`,
        `${message.guild.iconURL({ format: "png" })}`
      )
      .setColor(16729600)
      .setDescription(`Vous venez d'être averti : **${raison}**`)
      .setFooter(
        "Veillez à ne pas être trop averti",
        "https://i.gyazo.com/760fd534c0513e6f336817c759afa005.png"
      )
      .setImage(
        "https://i0.wp.com/northmantrader.com/wp-content/uploads/2020/02/WARNING.gif?ssl=1"
      )
      .setTimestamp();
    if (Array.isArray(qui) == true) {
      qui.forEach((element) => {
        element.send(embed);
      })
    } else {
      qui.send({
        embed
      });
    }

    return message.channel
      .send(`**${emojisiren} Infraction Enregistré ${emojisiren}**`)
      .then((msg) => {
        message.delete({
          timeout: 300
        });
        msg.delete({
          timeout: 5000
        });
      });
  } else {
    message.channel
      .send(`**Tu n'as pas la permission de faire ça ! ⛔️** *Tu dois avoir le role ${tocheck.name}*`)
      .then((msg) => {
        message.delete({
          timeout: 300
        });
        msg.delete({
          timeout: 5000
        });
      });
  }
};

module.exports.help = {
  name: "warn",
};