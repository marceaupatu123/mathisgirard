exports.run = (client, message, args) => {
  let args2 = Number(args[0]);
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
};
