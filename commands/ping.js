exports.run = (client, message) => {
    message.channel.send(`🏓La latence est de ${Date.now() - message.createdTimestamp}ms.\n🏓La Latence de l'API est de ${Math.round(client.ws.ping)}ms`)
}

module.exports.help = {
    name: "ping",
    description: "Regarde si le bot est online"
  }
  