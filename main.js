const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()
const config = require('./config.json')
const usermap = new Map()

client.config = config // Acceder

fs.readdir('./events', (err, files) => {
  // On regarde tout ce qu'il y a dans le dossier "events"
  if (err) return console.log(err) // On regarde si y a une erreur
  files.forEach((files) => {
    // On fait ça pour chaque élément
    const event = require(`./events/${files}`) // On prend le fichier
    const eventName = files.split('.')[0] // On garde que le nom
    client.on(eventName, event.bind(null, client)) // On lance l'event
  })
})

client.commands = new Discord.Collection()

fs.readdir('./commands', (err, files) => {
  const filter = files.filter((f) => f.split('.').pop() === 'js')
  if (filter.length <= 0) return console.log('Aucune commande trouvé')

  if (err) return console.log(err) // Look at error
  filter.forEach((files) => {
    const props = require(`./commands/${files}`) // On prend le fichier
    console.log(`Lancement de ${files}`)
    client.commands.set(props.help.name, props) // On fait en sorte de pouvoir utiliser la commande
  })
})

module.exports.checkusermods = function (user) {
  if (
    user.roles.cache.has('770657712870391810') ||
    user.roles.cache.has('779401942392373249')
  ) { return true } else return false
}

module.exports.getUserFromMention = function (
  mention,
  message = false,
  all = false
) {
  if (!mention) return false
  if (all) {
    return message.mentions.members
  }

  if (mention.startsWith('<@') && mention.endsWith('>')) {
    mention = mention.slice(2, -1)

    if (mention.startsWith('!')) {
      mention = mention.slice(1)
    }
    return client.users.cache.get(mention)
  }
  if (message) {
    return message.guild.members.cache.find(
      (id) =>
        id === mention ||
        id.user.username.toLowerCase().startsWith(mention.toLowerCase()) ||
        id.displayName.toLowerCase().startsWith(mention.toLowerCase())
    )
  }
}

module.exports.getMoreUsersFromMention = function (mention, message) {
  if (mention.includes(',')) {
    mention = mention.split(',')
    const array = []
    mention.forEach((element) => {
      if (this.getUserFromMention(element, message) !== undefined) { array.push(this.getUserFromMention(element, message)) }
    })
    return array
  } else {
    return this.getUserFromMention(mention, message)
  }
}
module.exports.getChannelFromMention = function (mention) {
  if (!mention) return false

  if (mention.startsWith('<#') && mention.endsWith('>')) {
    mention = mention.slice(2, -1)

    return client.channels.cache.get(mention)
  }
}

module.exports.getmembersbyroles = function (role, message) {
  if (!role) return false

  if (role.startsWith('<@&') && role.endsWith('>')) {
    role = role.slice(3, -1)

    const array = []
    message.guild.members.cache.forEach((member) => {
      if (member.roles.cache.has(role)) {
        array.push(member)
      }
    })
    return array
  }
}

module.exports.usermap = usermap

module.exports.mute = async function (client, message, member) {
  let muterole = message.guild.roles.cache.find(role => role.name === 'muted')
  if (!muterole) {
    try {
      muterole = await message.guild.roles.create({ data: { name: 'muted', permissions: [] } })
      message.guild.channels.cache.forEach(async (channel, id) => {
        await channel.createOverwrite(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        })
      })
    } catch (e) {
      console.log(e)
      message.channel
        .send('**⚠️ Je n\'ai pas la permission modifier les salons et/ou de créer des roles. ⚠️** ')
        .then((msg) => {
          msg.delete({ timeout: 5000 })
        })
    }
  }
  member.roles.add(muterole)
  message.reply(`Vous avez été mute ${client.emojis.cache.get('606942836016939037')}`).then((msg) => {
    msg.delete({ timeout: 5000 })
  })
  return muterole
}
client.login(config.token)
