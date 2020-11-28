exports.run = (client, message, args) => {
  const funtiontools = require("../main");
  let args2 = Number(args[0]);
  if (funtiontools.checkusermods(message.member) == true) {
    if (!isNaN(args2)) {
      if (args2 > 100) {
        message.channel.send(
          "⚠️ **Vous ne pouvez pas supprimer plus de 100 messages** ⚠️"
        );
        return;
      }
      message.channel
        .bulkDelete(args2 + 1, true)
        .catch(console.error);
      message.channel
        .send(`**${args2} messages** ont été supprimé(s) ✅`)
        .then(setTimeout(() => message.channel.bulkDelete(1), 5000));
    } else {
      message.channel.send("⚠️ **Ne mettez que des nombres** ⚠️");
    }
  } else {
    message.channel.send("**Tu n'as pas la permission de faire ça ! ⛔️** ");
  }
};

module.exports.help = {
  name: "clear",
  description: "Efface le nombres de message voulu.",
};
