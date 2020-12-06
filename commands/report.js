const fs = require("fs")
const Discord = require("discord.js")

exports.run = (client, message, args) => {
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
const reportschannel = message.guild.channels.cache.get(JSON.parse(
  fs.readFileSync("./json/report.json", "utf-8")
)[message.guild.id].reportchan)
const guildavatar = message.guild.iconURL({ format: "png" });

// Check if in DM
  if (message.channel.type == "dm")
    return message.channel
      .send("**⚠️ Cette commande ne peut pas s'effectuer en DM ⚠️** ")
      .then((msg) => {
        message.delete({ timeout: 300 });
        msg.delete({ timeout: 5000 });
      });
  // check if exist 
  if (!reportschannel)
    return message.channel
      .send(
        "**⚠️ Veuillez setup le salon reports avec la commande `setup reports [channel]`⚠️** "
      )
      .then((msg) => {
        message.delete({ timeout: 300 });
        msg.delete({ timeout: 5000 });
      });
  // Make embed
    const embed = new Discord.MessageEmbed()
      .setTitle(`Report de de ${message.author.username}`)
      .setAuthor(
        message.author.username,
        message.author.avatarURL({ format: "png" })
      )
      .setColor("RED")
      .setDescription(phrase)
      .setFooter("Tout report abusif sera sanctionnée", guildavatar)
      .setTimestamp();
      reportschannel.send(embed)

    


};

module.exports.help = {
  name: "report",
  description: "Fait un report aux modorateurs",
};
