const mongo = require('../mongo')
const modoschema = require('../schemas/mute-roles-schema')
const functiontools = require('../main')

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
        '**⚠️ Veuillez demander à un administrateur de setup les roles modérateurs avec la commande `setup muterole [role]`⚠️** '
      )
      .then((msg) => {
        msg.delete({
          timeout: 5000
        })
        message.delete()
      })
  }
  if (message.member.roles.cache.get(tocheck)) {
    if (message.channel.type === 'dm') {
      return message.channel
        .send("**⚠️ Cette commande ne peut pas s'effectuer en DM ⚠️** ")
        .then((msg) => {
          msg.delete({
            timeout: 5000
          })
          message.delete()
        })
    }
    if (!args[0] || !args[1]) {
      return message.channel
        .send('**⚠️ Vérifier votre commande `mute [membre] [raison]` ⚠️** ')
        .then((msg) => {
          msg.delete({
            timeout: 5000
          })
          message.delete()
        })
    }
    const qui = functiontools.getMoreUsersFromMention(args[0], message)
    if (Array.isArray(qui)) {
      qui.forEach(async (element) => {
        try {
          await functiontools.mute(client, message, element)
          message.channel.send(`**${element} à été mute 🔇!**`).then((msg) => {
            msg.delete({
              timeout: 5000
            })
          })
        } catch (error) {
          console.log(error)
        }
      })
    } else {
      try {
        await functiontools.mute(client, message, qui)
        message.channel.send(`**${qui} à été mute 🔇!**`).then((msg) => {
          msg.delete({
            timeout: 5000
          })
        })
      } catch (error) {
        console.log(error)
      }
    }
  } else {
    message.channel
      .send(
        `**Tu n'as pas la permission de faire ça ! ⛔️** *Tu dois avoir le role "${
          message.guild.roles.cache.get(tocheck).name
        }"*`
      )
      .then((msg) => {
        msg.delete({
          timeout: 5000
        })
      })
  }
  message.delete()
}

module.exports.help = {
  name: 'mute'
}
