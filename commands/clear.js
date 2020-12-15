exports.run = (client, message, args) => {
  if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
    return message.channel
    .send("**Je n'ai pas la permission de gérer les messages 🤒** ")
    .then((msg) => {
      message.delete({ timeout: 300 });
      msg.delete({ timeout: 5000 });
    });
  }
  const funtiontools = require("../main");
  if (!args[0])
    return message.channel
      .send("**⚠️ Vérifier votre commande `clear [nombre de messages]` ⚠️** ")
      .then((msg) => {
        message.delete({ timeout: 300 });
        msg.delete({ timeout: 5000 });
      });
  let args2 = Number(args[0]);
  if (message.member.hasPermission("MANAGE_MESSAGES")) {
    if (!isNaN(args2)) {
      if (args2 > 100) {
        message.channel
          .send("⚠️ **Vous ne pouvez pas supprimer plus de 100 messages** ⚠️")
          .then((msg) => {
            message.delete({ timeout: 300 });
            msg.delete({ timeout: 5000 });
          });
        return;
      }
      message.channel.bulkDelete(args2, true).catch(console.error);
      message.channel
        .send(`**${args2} messages** ont été supprimé(s) ✅`)
        .then((msg) => {
          message.delete({ timeout: 300 });
          msg.delete({ timeout: 5000 });
        });
    } else {
      message.channel
        .send("⚠️ **Ne mettez que des nombres ⚠️**")
        .then((msg) => {
          message.delete({ timeout: 300 });
          msg.delete({ timeout: 5000 });
        });
    }
  } else {
    message.channel
      .send("**Tu n'as pas la permission de faire ça ! ⛔️** *(MANAGE_MESSAGE)* ")
      .then((msg) => {
        message.delete({ timeout: 300 });
        msg.delete({ timeout: 5000 });
      });
  }
  message.delete({ timeout: 300 });
};

module.exports.help = {
  name: "clear",
  description: "Efface le nombres de message voulu.",
};
