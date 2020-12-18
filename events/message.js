const { usermap, mute } = require('../main')
const mongo = require('../mongo')
const muteschema = require('../schemas/mute-schema')

module.exports = async (client, message) => {
  if (message.author.bot) return
  let tocheck = false
  await mongo().then(async (mongoose) => {
    // https://www.youtube.com/watch?v=A1VRitCjL6Y 10:24
    try {
      const guildID = message.guild.id

      const result = await muteschema.findOne({ _id: guildID })
      tocheck = result.mute
    } catch (error) {
      tocheck = false
    } finally {
      mongoose.connection.close()
    }
  })
  if (tocheck) {
    if (usermap.has(message.author.id)) {
      const userData = usermap.get(message.author.id)
      const { lastMessage, timer } = userData
      const difference = message.createdTimestamp - lastMessage.createdTimestamp
      let msgCount = userData.msgCount
      if (difference > 3000) {
        clearTimeout(timer)
        userData.msgCount = 1
        userData.lastMessage = message
        userData.timer = setTimeout(() => {
          usermap.delete(message.author.id)
        }, 7000)
        usermap.set(message.author.id, userData)
      } else {
        ++msgCount
        setTimeout(() => {}, 80)
        if (parseInt(msgCount) === 5) {
        // https://www.youtube.com/watch?v=vmbhnAFzxDI 10:05
          const muterole = await mute(client, message, message.member)
          setTimeout(async () => {
            message.member.roles.remove(muterole).catch(() => {
              message.channel.send('Je n\'ai pas pu enlever le role muted.').then((msg) => {
                msg.delete({ timeout: 5000 })
              })
            })
            message.reply(`Vous avez été démute ${client.emojis.cache.get('606942836016939037')}`).then((msg) => {
              msg.delete({ timeout: 5000 })
            })
          }, 7000)
        } else {
          userData.msgCount = msgCount
          usermap.set(message.author.id, userData)
        }
      }
    } else {
      const fn = setTimeout(() => {
        usermap.delete(message.author.id)
      }, 7000)
      usermap.set(message.author.id, {
        msgCount: 1,
        lastMessage: message,
        timer: fn
      })
    }
  }
  if (message.content.startsWith(client.config.prefix)) {
    const args = message.content
      .slice(client.config.prefix.length)
      .trim()
      .split(/ +/)
    const commande = args.shift().toLowerCase()
    const cmd = client.commands.get(commande)

    if (!cmd) return

    return cmd.run(client, message, args)
  }
}
