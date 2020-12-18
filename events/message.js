module.exports = async (client, message) => {
  if (message.author.bot) {
    return;
  }
  if (message.content.startsWith(client.config.prefix)) {
    const args = message.content
      .slice(client.config.prefix.length)
      .trim()
      .split(/ +/);
    const commande = args.shift().toLowerCase();
    const cmd = client.commands.get(commande);

    if (!cmd) return;

    return cmd.run(client, message, args);
  }
};
