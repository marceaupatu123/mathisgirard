exports.run = (client, message, args) => {
  if (message.channel.type === 'dm') {
    return message.channel
      .send("**⚠️ Cette commande ne peut pas s'effectuer en DM ⚠️** ")
      .then((msg) => {
        message.delete({ timeout: 300 })
        msg.delete({ timeout: 5000 })
      })
  }
  if (!args[0] || !args[1]) {
    return message.channel
      .send(
        '**⚠️ Vérifier votre commande `conseil [type] [mention+ ou channel] [phrase]` ⚠️** '
      )
      .then((msg) => {
        message.delete({ timeout: 300 })
        msg.delete({ timeout: 5000 })
      })
  }

  const Discord = require('discord.js')
  const functiontools = require('../main')
  let type = args[0].toLowerCase()
  const qui =
    functiontools.getMoreUsersFromMention(args[1], message) ||
    functiontools.getChannelFromMention(args[1]) ||
    functiontools.getmembersbyroles(args[1], message) ||
    message.mentions.members.first()
  const phrase = args.slice(2).join(' ')
  const guildavatar = message.guild.iconURL({ format: 'png' })
  const author = message.author
  const logscmpc = message.guild.channels.cache.get('789476900052795392')
  const covid = client.guilds.cache.get('789429664149274664') || 'La France Libre'

  if (message.guild.id === covid.id) {
    // Check variable
    if (!type) {
      message.channel
        .send('**⚠️ Veuillez spécifier un type de conseil ⚠️** ')
        .then((msg) => {
          message.delete({ timeout: 300 })
          msg.delete({ timeout: 5000 })
        })
      return
    } else if (type !== 'iga') {
      type = 'iga'
      // message.channel
      //   .send(
      //     '⚠️ Type de conseil invalide, ceux qui sont disponibles sont : **iga** ⚠️ '
      //   )
      //   .then((msg) => {
      //     message.delete({ timeout: 300 })
      //     msg.delete({ timeout: 5000 })
      //   })
      // return
    } else if (qui === undefined) {
      message.channel
        .send("**⚠️ Je ne trouve pas l'utilisateur ou le salon ⚠️**")
        .then((msg) => {
          message.delete({ timeout: 300 })
          msg.delete({ timeout: 5000 })
        })
      return
    } else if (qui === false) {
      message.channel
        .send('**⚠️ Veuillez spécifier un destinataire ⚠️**')
        .then((msg) => {
          message.delete({ timeout: 300 })
          msg.delete({ timeout: 5000 })
        })
      return
    } else if (!phrase) {
      message.channel
        .send('**⚠️  Veuillez spécifier une phrase ⚠️**')
        .then((msg) => {
          message.delete({ timeout: 300 })
          msg.delete({ timeout: 5000 })
        })
      return
    }

    if (type === 'iga') {
      if (!message.member.roles.cache.has('809860653018906635')) {
        message.channel
          .send("**Tu n'as pas la permission de faire ça** ⛔️ ")
          .then((msg) => {
            message.delete({ timeout: 300 })
            msg.delete({ timeout: 5000 })
          })
        return
      }
      const embed = new Discord.MessageEmbed()
        .setTitle(`Lettre de ${author.username}`)
        .setAuthor(
          'Inspection générale des armées',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Emblem_of_the_Inspectorate_General_of_the_French_Armed_Forces.png/390px-Emblem_of_the_Inspectorate_General_of_the_French_Armed_Forces.png'
        )
        .setColor('ORANGE')
        .setDescription(phrase)
        .setFooter('Ce message est un message officiel', guildavatar)
        .setTimestamp()
      if (Array.isArray(qui) === true) {
        qui.forEach((element) => {
          element.send(embed).catch(() => {
            return message.channel
              .send(`**⚠️ Je n'ai pas pu envoyer le message à ${element} ⚠️**`)
              .then((msg) => {
                message.delete({ timeout: 300 })
                msg.delete({ timeout: 5000 })
              })
          })
        })
        logscmpc.send(`Pour ${qui.join(' et ')} par ${author},`, { embed })
      } else {
        qui.send(embed).catch(() => {
          return message.channel
            .send(`**⚠️ Je n'ai pas pu envoyer le message à ${qui} ⚠️**`)
            .then((msg) => {
              message.delete({ timeout: 300 })
              msg.delete({ timeout: 5000 })
            })
        })
        logscmpc.send(`Pour ${qui} par ${author},`, { embed })
      }
    } else {
      return message.channel
        .send(
          '⚠️ Type de conseil invalide, ceux qui sont disponibles sont : **iga** ⚠️ '
        )
        .then((msg) => {
          message.delete({ timeout: 300 })
          msg.delete({ timeout: 5000 })
        })
    }
    message.channel.send('Ton message a été envoyé 📬').then((msg) => {
      message.delete({ timeout: 300 })
      msg.delete({ timeout: 5000 })
    })
  } else {
    return message.channel
      .send(
        `⚠️ **Vous ne pouvez pas faire cette commande dans un serveur autre que ${covid.name || 'La France Libre'}** ⚠️`
      )
      .then((msg) => {
        message.delete({ timeout: 300 })
        msg.delete({ timeout: 5000 })
      })
  }
}
module.exports.help = {
  name: 'conseil',
  description: ''
}
