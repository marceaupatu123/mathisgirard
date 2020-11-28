exports.run = (client, message, args) => {
  const funtiontools = require("../main");
  let args2 = Number(args[0]);
  if (funtiontools.checkusermods(message.member) == true) {
    if (!isNaN(args2)) {
      message.channel.bulkDelete(args2).catch(console.error);
      message.channel
        .send("Message supprimé !")
        .catch(console.error)
        .then(
          setTimeout(
            () => message.channel.bulkDelete(1).catch(console.error),
            5000
          )
        );
    } else {
      message.channel.send("Un problème est survenu !");
    }
  } else {
    message.channel.send("Tu n'as pas la permission de faire ça !");
  }
};

module.exports.help = {
  name: "clear",
};
