const mongo = require('../mongo')
const functiontools = require('../main')
const warnSchema = require('../schemas/warn-schema')
const Discord = require('discord.js')

 exports.run = async (client, message, args) => {
  if (message.channel.type === 'dm') {
    return message.channel
      .send("**⚠️ Cette commande ne peut pas s'effectuer en DM ⚠️** ")
      .then((msg) => {
        message.delete({ timeout: 300 })
        msg.delete({ timeout: 5000 })
      })
  }
  let qui
  if (!args[0]) {
    qui = message.author
    args[0] = 'je suis une catin'
  } else {
    qui = functiontools.getMoreUsersFromMention(args[0], message)
  }
  if (qui === undefined && args[0].length !== 6) {
    message.channel
      .send("**⚠️ Je ne trouve pas l'utilisateur ⚠️**")
      .then((msg) => {
        message.delete({ timeout: 300 })
        msg.delete({ timeout: 5000 })
      })
    return
  }

  const guildID = message.guild.id
  const ticket2 = args[0]
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  }
  let tocheck

  if (args[0].length === 6) {
    await mongo().then(async (mongoose) => {
      try {
        const results = await warnSchema.findOne({
          guildID,
          'warnings.ticket': ticket2
        })
        let reply = ''

        for (const warns of results.warnings) {
          const { author, timestamp, raison } = warns

          reply += `Avertissement fait par <@${author}> le **${new Date(timestamp).toLocaleDateString('fr-FR', options)}** à <@${
            results.memberID
          }> pour **"${raison}"**\n\n`
        }
        const embed = new Discord.MessageEmbed()
          .setTitle(`Avertissement "${ticket2}"`)
          .setAuthor(
            `${message.guild.name}`,
            `${message.guild.iconURL({ format: 'png' }) || 'https://i.gyazo.com/31bc9eb5602cbf58f360d46d3c8e5534.gif'}`
          )
          .setColor(16729600)
          .setDescription(reply)
          .setFooter(
            'Vive les modérateurs',
            'https://i.gyazo.com/760fd534c0513e6f336817c759afa005.png'
          )
          // .setImage(
          //   "https://i0.wp.com/northmantrader.com/wp-content/uploads/2020/02/WARNING.gif?ssl=1"
          // )
          .setTimestamp()

        message.channel.send({ embed }).then((msg) => {
          message.delete({ timeout: 300 })
          msg.delete({ timeout: 10000 })
        })
      } catch (err) {
        tocheck = false
      } finally {
        mongoose.connection.close()
      }
    })
    if (tocheck === false) {
      return message.channel
        .send("**🌀 Cet avertissement n'existe pas 🌀** ")
        .then((msg) => {
          message.delete({ timeout: 300 })
          msg.delete({ timeout: 5000 })
        })
    }
  } else {
    await mongo().then(async (mongoose) => {
      try {
        const results = await warnSchema.findOne({
          guildID,
          memberID: qui.id
        })

        let reply = ''
        let counter = 0
        for (const warns of results.warnings) {
          counter++
          const { author, timestamp, raison, ticket } = warns

          reply += `**-** Avertissement **${ticket}** fait par <@${author}> le **${new Date(timestamp).toLocaleDateString('fr-FR', options)}** pour "${raison}"\n\n`
        }

        const embed = new Discord.MessageEmbed()
          .setTitle(`Avertissement(s) de ${message.guild.members.cache.get(results.memberID).displayName}`)
          .setAuthor(
            `${message.guild.name}`,
            `${message.guild.iconURL({ format: 'png' }) || 'https://i.gyazo.com/31bc9eb5602cbf58f360d46d3c8e5534.gif'}`
          )
          .setColor(16729600)
          .setDescription(`**l'Utilisateur à ${counter} avertissement(s)**\n\n${reply}`)
          .setFooter(
            'Vive les modérateurs',
            'https://i.gyazo.com/760fd534c0513e6f336817c759afa005.png'
          )
          .setImage(
            'https://i0.wp.com/northmantrader.com/wp-content/uploads/2020/02/WARNING.gif?ssl=1'
          )
          .setTimestamp()
        message.channel.send({ embed }).then((msg) => {
          message.delete({ timeout: 300 })
          msg.delete({ timeout: 10000 })
        })
      } catch (err) {
        tocheck = false
      } finally {
        mongoose.connection.close()
      }
    })
    if (tocheck === false) {
      return message.channel
        .send("**🌀 Cette personne ne dispose d'aucun avertissement 🌀** ")
        .then((msg) => {
          message.delete({ timeout: 300 })
          msg.delete({ timeout: 5000 })
        })
    }
  }
}

module.exports.help = {
  name: 'checkwarn'
}
