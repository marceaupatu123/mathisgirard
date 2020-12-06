const fs = require("fs");
exports.run = (client, message, args) => {

// check if dm
  if (message.channel.type == "dm")
  return message.channel
    .send("**⚠️ Cette commande ne peut pas s'effectuer en DM ⚠️** ")
    .then((msg) => {
      message.delete({ timeout: 300 });
      msg.delete({ timeout: 5000 });
    });


  // Check Args
  if (!args[0])
    return message.channel
      .send("**⚠️ Vérifier votre commande `setup [type de setup]` ⚠️** ")
      .then((msg) => {
        message.delete({ timeout: 300 });
        msg.delete({ timeout: 5000 });
      });

  // Setup Variable
  const type = args[0].toLowerCase();
  const chan = message.mentions.channels.first().id;

  // Check Permission
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.channel
      .send("**Tu n'as pas la permission de faire ça** *(MANAGE_GUILD)*⛔️ ")
      .then((msg) => {
        message.delete({ timeout: 300 });
        msg.delete({ timeout: 5000 });
      });
  // Check type
  if (type != "report")
    return message.channel
      .send("**⚠️ Configuration Incorrecte, config dispo: `report`⚠️** ")
      .then((msg) => {
        message.delete({ timeout: 300 });
        msg.delete({ timeout: 5000 });
      });
  // Check Channel
  if (chan == undefined)
    return message.channel.send("**⚠️ Salon Introuvable ⚠️** ").then((msg) => {
      message.delete({ timeout: 300 });
      msg.delete({ timeout: 5000 });
    });

  if (type == "report") {
    let reportchan = JSON.parse(fs.readFileSync("./json/report.json", "utf-8"));

    reportchan[message.guild.id] = { reportchan: chan };

    fs.writeFileSync(
      "./json/report.json",
      JSON.stringify(reportchan),
      (err) => {
        if (err) message.channel.send(`ERROR : ${err}`);
        return;
      }
    );
    
    reportstest = JSON.parse(fs.readFileSync("./json/report.json", "utf-8"));
    return message.channel.send("**Setup fait avec succès ✅** ").then((msg) => {
      message.delete({ timeout: 300 });
      msg.delete({ timeout: 5000 });
    });
  }
};
module.exports.help = {
  name: "setup",
  description: "Configure le bot pour le serveur",
};
