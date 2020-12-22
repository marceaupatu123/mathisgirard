const { usermap, mute } = require('../main')
const mongo = require('../mongo')
const warnSchema = require('../schemas/warn-schema')
const mutedb = require('../json/mute.json')

function makeid (length) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

module.exports = async (client, message) => {
  if (message.author.bot) return
  let tocheck = true
  if (!mutedb[message.channel.guild.id]) {
    tocheck = true
  } else {
    tocheck = mutedb[message.channel.guild.id].status
  }
  if (tocheck) {
    const LIMIT = 3
    const TIME = 3000
    const DIFF = 3000
    if (usermap.has(message.author.id)) {
      const userData = usermap.get(message.author.id)
      const { lastMessage, timer } = userData
      const difference = message.createdTimestamp - lastMessage.createdTimestamp
      let msgCount = userData.msgCount
      console.log(difference)
      if (difference > DIFF) {
        clearTimeout(timer)
        userData.msgCount = 1
        userData.lastMessage = message
        userData.timer = setTimeout(() => {
          usermap.delete(message.author.id)
        }, TIME)
        usermap.set(message.author.id, userData)
      } else {
        ++msgCount
        if (parseInt(msgCount) === LIMIT) {
          // https://www.youtube.com/watch?v=vmbhnAFzxDI 10:05
          const muterole = await mute(client, message, message.member)
          message.reply(`Vous avez été mute ${client.emojis.cache.get('606942836016939037')}`).then((msg) => {
            msg.delete({ timeout: 5000 })
          })
          const raison = "Mute de l'antispam"
          const guildID = message.guild.id
          const memberID = message.member.id
          const ticket = makeid(6)
          const warning = {
            author: client.user,
            timestamp: new Date().getTime(),
            ticket,
            raison
          }

          await mongo().then(async (mongoose) => {
            try {
              await warnSchema.findOneAndUpdate({
                guildID,
                memberID
              }, {
                guildID,
                memberID,
                $push: {
                  warnings: warning
                }
              }, {
                upsert: true
              })
            } catch (error) {
              console.log(error)
            } finally {
              mongoose.connection.close()
            }
          })
          setTimeout(async () => {
            try {
              message.member.roles.remove(muterole)
              message.reply(`Vous avez été démute ${client.emojis.cache.get('606942836016939037')}`).then((msg) => {
                msg.delete({ timeout: 5000 })
              })
            } catch (err) {
              console.log(err)
            }
          }, 300000)
        } else {
          userData.msgCount = msgCount
          usermap.set(message.author.id, userData)
        }
      }
    } else {
      const fn = setTimeout(() => {
        usermap.delete(message.author.id)
      }, TIME)
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
