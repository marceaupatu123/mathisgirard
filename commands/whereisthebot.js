const { ClientUser } = require("discord.js")

exports.run = (client, message, args) => {

client.guilds.cache.forEach(element => {
  element.channels.cache.filter(x => x.type != "category").random().createInvite()
          .then(inv => message.channel.send(`${element.name} | ${inv.url}`));
});
}
module.exports.help = {
  name: 'whereisthebot',
  description: 'Efface le nombres de message voulu.'
}
