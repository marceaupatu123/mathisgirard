const fs = require("fs")
const Discord = require("discord.js")
const mongo = require("../mongo")
const schemareports = require("../schemas/reports-channel-schema");

exports.run = async (client, message, args) => {
// Check args
  if (!args[0])
    return message.channel
      .send(
        "**⚠️ Vérifier votre commande `reports [phrase]` ⚠️** "
      )
      .then((msg) => {
        message.delete({ timeout: 300 });
        msg.delete({ timeout: 5000 });
      });
const phrase = args.slice(0).join(" ");
let tocheck 
  await mongo().then(async (mongoose) => {
      // https://www.youtube.com/watch?v=A1VRitCjL6Y 10:24
      try {
        const guildID = message.guild.id

        const result = await schemareports.findOne({_id: guildID})
        tocheck = result.channelID
      } catch (error) {
        tocheck = false
      } finally {
      mongoose.connection.close()
      }
  })

 // check if exist 
 if (!tocheck)
 return message.channel
   .send(
     "**⚠️ Veuillez demander à un modérateur de setup le salon reports avec la commande `setup report [channel]`⚠️** "
   )
   .then((msg) => {
     message.delete({ timeout: 300 });
     msg.delete({ timeout: 5000 });
   });
const reportschannel = message.guild.channels.cache.get(tocheck)
const guildavatar = message.guild.iconURL({ format: "png" });

// Check if in DM
  if (message.channel.type == "dm")
    return message.channel
      .send("**⚠️ Cette commande ne peut pas s'effectuer en DM ⚠️** ")
      .then((msg) => {
        message.delete({ timeout: 300 });
        msg.delete({ timeout: 5000 });
      });

  // Make embed
    const embed = new Discord.MessageEmbed()
      .setTitle(`Report de de ${message.author.tag}`)
      .setAuthor(
        message.author.username,
        message.author.avatarURL({ format: "png" })
      )
      .setColor("RED")
      .setDescription(phrase)
      .setFooter("Tout report abusif sera sanctionnée", guildavatar)
      .setTimestamp();
      reportschannel.send(embed)
      return message.channel.send("**Votre plainte à été envoyé avec succès ✅** ").then((msg) => {
        message.delete({ timeout: 300 });
        msg.delete({ timeout: 5000 });
      });
    };

module.exports.help = {
  name: "report",
  description: "Fait un report aux modorateurs",
};
