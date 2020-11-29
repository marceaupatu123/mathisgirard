exports.run = (client, message) => {
    message.reply(`🏓La latence est de ${Date.now() - message.createdTimestamp}ms. La Latence de l'API est de ${Math.round(client.ws.ping)}ms`)
}

module.exports.help = {
    name: "ping",
    description: "Regarde si le bot est online"
  }
  