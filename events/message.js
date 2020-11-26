module.exports = async (client, message) => {
  if (message.author.bot || !message.content.startsWith(client.config.prefix))
    return;

  const args = message.content
    .slice(client.config.prefix.length)
    .trim()
    .split(/ +/);
  const commande = args.shift();
  const cmd = client.commands.get(commande);

  if (!cmd) return;

  return cmd.run(client, message, args)
};
