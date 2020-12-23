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
        message.delete({
          timeout: 300
        })
        msg.delete({
          timeout: 5000
        })
      })
  }
  if (message.member.roles.cache.get(tocheck)) {
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
    if (!message.guild.roles.cache.find((role) => role.name === 'muted')) {
      return message.channel
        .send('**⚠️ Il n\'y a pas de role mute sur le seveur⚠️** ')
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
        .send('**⚠️ Vérifier votre commande `unmute [membre] [raison]` ⚠️** ')
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
    if (!Array.isArray(qui) === true) {
      if (!qui.roles.cache.find((role) => role.name === 'muted')) {
        return message.channel
          .send(`**⚠️ ${qui} n'est pas mute ⚠️**`)
          .then((msg) => {
            message.delete({
              timeout: 300
            })
            msg.delete({
              timeout: 5000
            })
          })
      }
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
      try {
        qui.roles.remove(message.guild.roles.cache.find((role) => role.name === 'muted'))
        message.channel
          .send(`**${qui} à été démute 🔊 !**`)
          .then((msg) => {
            msg.delete({
              timeout: 5000
            })
          })
      } catch (err) {
        console.log(err)
        message.channel
          .send('**Je n\'ai as la permission de d\'enlever le rôle "muted" 🤒 !**')
          .then((msg) => {
            message.delete({
              timeout: 300
            })
            msg.delete({
              timeout: 5000
            })
          })
      }
    } else {
      // Tutududu
      qui.forEach(element => {
        if (!element.roles.cache.find((role) => role.name === 'muted')) {
          return message.channel
            .send(`**⚠️ ${element} n'est pas mute ⚠️**`)
            .then((msg) => {
              message.delete({
                timeout: 300
              })
              msg.delete({
                timeout: 5000
              })
            })
        }
        if (element === undefined) {
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
        } else if (element === false) {
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
        try {
          element.roles.remove(message.guild.roles.cache.find((role) => role.name === 'muted'))
          message.channel
            .send(`**${element} à été démute 🔊 !**`)
            .then((msg) => {
              msg.delete({
                timeout: 5000
              })
            })
        } catch (err) {
          console.log(err)
          message.channel
            .send('**Je n\'ai as la permission de d\'enlever le rôle "muted" 🤒 !**')
            .then((msg) => {
              message.delete({
                timeout: 300
              })
              msg.delete({
                timeout: 5000
              })
            })
        }
      })
    }
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
  message.delete()
}

module.exports.help = {
  name: 'unmute'
}
