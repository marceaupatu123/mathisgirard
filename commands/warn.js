const mongo = require('../mongo')
const functiontools = require('../main')
const modoschema = require('../schemas/modo-roles-schema')

exports.run = async (client, message, args) => {
  let tocheck = true
  await mongo().then(async (mongoose) => {
    // https://www.youtube.com/watch?v=A1VRitCjL6Y 10:24
    try {
      const guildID = message.guild.id

      const result = await modoschema.findOne({
        _id: guildID
      })
      tocheck = result.rolemodo
    } catch (error) {
      tocheck = false
    } finally {
      mongoose.connection.close()
    }
  })

  if (tocheck === false) {
    return message.channel
      .send(
        '**⚠️ Veuillez demander à un administrateur de setup les roles modérateurs avec la commande `setup warnrole [role]`⚠️** '
      )
      .then((msg) => {
        message.delete({
          timeout: 300
        })
        msg.delete({
          timeout: 5000
        })
      })
  }
  if (message.member.roles.cache.get(tocheck)) {
    const emojisiren = client.emojis.cache.get('613053264350543873')
    if (message.channel.type === 'dm') {
      return message.channel
        .send("**⚠️ Cette commande ne peut pas s'effectuer en DM ⚠️** ")
        .then((msg) => {
          message.delete({
            timeout: 300
          })
          msg.delete({
            timeout: 5000
          })
        })
    }

    if (!args[0] || !args[1]) {
      return message.channel
        .send('**⚠️ Vérifier votre commande `warn [membre] [raison]` ⚠️** ')
        .then((msg) => {
          message.delete({
            timeout: 300
          })
          msg.delete({
            timeout: 5000
          })
        })
    }
    const qui = functiontools.getMoreUsersFromMention(args[0], message)
    if (qui === undefined) {
      message.channel
        .send("**⚠️ Je ne trouve pas l'utilisateur ⚠️**")
        .then((msg) => {
          message.delete({
            timeout: 300
          })
          msg.delete({
            timeout: 5000
          })
        })
      return
    } else if (qui === false) {
      message.channel
        .send('**⚠️ Veuillez spécifier un destinataire ⚠️**')
        .then((msg) => {
          message.delete({
            timeout: 300
          })
          msg.delete({
            timeout: 5000
          })
        })
      return
    }
    const raison = args.slice(1).join(' ')
    functiontools.warn(client, message, qui, raison)

    return message.channel
      .send(`**${emojisiren} Infraction Enregistré ${emojisiren}**`)
      .then((msg) => {
        message.delete({
          timeout: 300
        })
        msg.delete({
          timeout: 5000
        })
      })
  } else {
    message.channel
      .send(`**Tu n'as pas la permission de faire ça ! ⛔️** *Tu dois avoir le role "${message.guild.roles.cache.get(tocheck).name}"*`)
      .then((msg) => {
        message.delete({
          timeout: 300
        })
        msg.delete({
          timeout: 5000
        })
      })
  }
}

module.exports.help = {
  name: 'warn'
}
