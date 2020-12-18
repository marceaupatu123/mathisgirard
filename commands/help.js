exports.run = (client, message) => {
  const Discord = require('discord.js')
  const covid = client.guilds.cache.get('789429664149274664')

  const embed = new Discord.MessageEmbed()
    .setTitle(`Commande ${message.author.username}`)
    .setAuthor(
      'Listes des commandes',
      'https://dzcharikati.net/wp-content/uploads/2019/08/scales-of-justice-logo.jpg'
    )
    .setColor('RANDOM')
    .addFields(
      {
        name: 'Modération',
        value: "`Clear` : Permet de supprimer un montant donné de messages. *(MANAGE_MESSAGES PERM)*\n`Warn` : **[COMPATIBLE MENTION+]** Permet d'avertir quelqu'un. *(Necessite un rôle particulier)*",
        inline: true
      },
      {
        name: 'Utile',
        value: "`Ping` : Permet de connaitre la latence du bot.\n`Report`: Permet de report un problèle à la moderation.\n`Checkwarn`: Permet d'avoir les warns d'un membre ou d'un code",
        inline: true
      },
      {
        name: 'Administration',
        value: '`Setup` : Permet de setup le serveur pour le bot. *(MANAGE_GUILD PERM)*',
        inline: true
      },
      {
        name: `Commandes de "${covid.name}"`,
        value:
          "`Conseil` : **[COMPATIBLE MENTION+]** Permet de faire un mesage à envoyer à une personne ou un channel en tant que membre d'un conseil."
      }
    )

    .setFooter(
      'Bot créé par Dominus_Marceau#8457',
      client.users.cache.get('284036155928870912').avatarURL({ format: 'png' })
    )
    .setTimestamp()
  message.channel.send(embed).then((msg) => {
    message.delete({ timeout: 300 })
    msg.delete({ timeout: 10000 })
  })
}

module.exports.help = {
  name: 'help',
  description: ''
}
