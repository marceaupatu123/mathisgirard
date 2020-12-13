const mongo = require("../mongo");
const functiontools = require("../main");
const warnSchema = require("../schemas/warn-schema");
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
  if (message.channel.type == "dm")
    return message.channel
      .send("**⚠️ Cette commande ne peut pas s'effectuer en DM ⚠️** ")
      .then((msg) => {
        message.delete({ timeout: 300 });
        msg.delete({ timeout: 5000 });
      });

  if (!args[0] || !args[1])
    return message.channel
      .send("**⚠️ Vérifier votre commande `warn [membre] [raison]` ⚠️** ")
      .then((msg) => {
        message.delete({ timeout: 300 });
        msg.delete({ timeout: 5000 });
      });
  const qui = functiontools.getMoreUsersFromMention(args[0], message);
  if (qui == undefined) {
    message.channel
      .send("**⚠️ Je ne trouve pas l'utilisateur ⚠️**")
      .then((msg) => {
        message.delete({ timeout: 300 });
        msg.delete({ timeout: 5000 });
      });
    return;
  } else if (qui == false) {
    message.channel
      .send("**⚠️ Veuillez spécifier un destinataire ⚠️**")
      .then((msg) => {
        message.delete({ timeout: 300 });
        msg.delete({ timeout: 5000 });
      });
    return;
  }
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
      await warnSchema.findOneAndUpdate(
        {
          guildID,
          memberID,
        },
        {
          guildID,
          memberID,
          $push: {
            warnings: warning,
          },
        },
        {
          upsert: true,
        }
      );
    } catch (error) {
      tocheck = false;
    } finally {
      mongoose.connection.close();
    }
  });

  if (tocheck == false) return;

  const embed = new Discord.MessageEmbed()
    .setTitle(`Avertissement ${ticket}`)
    .setAuthor(
      `${message.guild.name}`,
      `${message.guild.iconURL({ format: "png" })}`
    )
    .setColor("NAVY")
    .setDescription(`Vous venez d'être averti : **${raison}**`)
    .setFooter(
      "Veillez à ne pas être trop averti",
      "https://i.gyazo.com/760fd534c0513e6f336817c759afa005.png"
    )
    .setImage(
      "https://i0.wp.com/northmantrader.com/wp-content/uploads/2020/02/WARNING.gif?ssl=1"
    )
    .setTimestamp();
  qui.send({ embed });

  return message.channel
    .send("**🛂 Infraction Enregistré ✅** ")
    .then((msg) => {
      message.delete({ timeout: 300 });
      msg.delete({ timeout: 5000 });
    });
};

module.exports.help = {
  name: "warn",
};
