const mongo = require('../mongo')
const schemareports = require('../schemas/reports-channel-schema')
const modoschema = require('../schemas/warn-roles-schema')
const muteschema = require('../schemas/mute-roles-schema')
const mutedb = require('../json/mute.json')
const fs = require('fs')

exports.run = async (client, message, args) => {
  // check if dm
  if (message.channel.type === 'dm') {
    return message.channel
      .send("**⚠️ Cette commande ne peut pas s'effectuer en DM ⚠️** ")
      .then((msg) => {
        message.delete({ timeout: 300 })
        msg.delete({ timeout: 5000 })
      })
  }

  // Check Args
  if (!args[0]) {
    return message.channel
      .send('**⚠️ Vérifier votre commande `setup [type de setup]` ⚠️** ')
      .then((msg) => {
        message.delete({ timeout: 300 })
        msg.delete({ timeout: 5000 })
      })
  }

  // Setup Variable
  const type = args[0].toLowerCase()

  // Check Permission
  if (!message.member.hasPermission('MANAGE_GUILD')) {
    return message.channel
      .send("**Tu n'as pas la permission de faire ça** *(MANAGE_GUILD)*⛔️ ")
      .then((msg) => {
        message.delete({ timeout: 300 })
        msg.delete({ timeout: 5000 })
      })
  }
  // Check type
  if (type !== 'report' && type !== 'warnrole' && type !== 'antispam' && type !== 'muterole') {
    return message.channel
      .send(
        '**⚠️ Configuration Incorrecte, config dispo: `report, warnrole, antispam, muterole`⚠️** '
      )
      .then((msg) => {
        message.delete({ timeout: 300 })
        msg.delete({ timeout: 5000 })
      })
  }

  if (type === 'report') {
    let chan
    try {
      chan = message.mentions.channels.first().id
    } catch (error) {
      chan = undefined
    }
    // Check Channel
    if (chan === undefined) {
      return message.channel
        .send('**⚠️ Salon Introuvable ⚠️** ')
        .then((msg) => {
          message.delete({ timeout: 300 })
          msg.delete({ timeout: 5000 })
        })
    }

    await mongo().then(async (mongoose) => {
      try {
        await schemareports.findOneAndUpdate(
          { _id: message.guild.id },
          { _id: message.guild.id, channelID: chan },
          { upsert: true }
        )
        message.channel
          .send('**Le setup du channel report est fait avec succès ✅** ')
          .then((msg) => {
            message.delete({ timeout: 300 })
            msg.delete({ timeout: 5000 })
          })
      } catch (error) {
        message.channel.send(`**ERROR : ${error}** `).then((msg) => {
          message.delete({ timeout: 300 })
          msg.delete({ timeout: 5000 })
        })
      } finally {
        mongoose.connection.close()
      }
    })
  } else if (type === 'warnrole') {
    let role
    try {
      role = message.mentions.roles.first().id
    } catch (error) {
      role = undefined
    }
    // Check Channel
    if (role === undefined) {
      return message.channel.send('**⚠️ Role Introuvable ⚠️** ').then((msg) => {
        message.delete({ timeout: 300 })
        msg.delete({ timeout: 5000 })
      })
    }
    await mongo().then(async (mongoose) => {
      try {
        await modoschema.findOneAndUpdate(
          { _id: message.guild.id },
          { _id: message.guild.id, rolemodo: role },
          { upsert: true }
        )
        message.channel
          .send('**Le setup du role qui peut warn a été fait avec succès ✅** ')
          .then((msg) => {
            message.delete({ timeout: 300 })
            msg.delete({ timeout: 5000 })
          })
      } catch (error) {
        message.channel.send(`**ERROR : ${error}** `).then((msg) => {
          message.delete({ timeout: 300 })
          msg.delete({ timeout: 5000 })
        })
      } finally {
        mongoose.connection.close()
      }
    })
  } else if (type === 'antispam') {
    let tocheck = true
    if (mutedb[message.channel.guild.id] === undefined) {
      mutedb[message.channel.guild.id] = {
        status: tocheck
      }
    } else {
      if (mutedb[message.channel.guild.id].status === true) {
        tocheck = false
      } else {
        tocheck = true
      }
      mutedb[message.channel.guild.id] = {
        status: tocheck
      }
    }
    fs.writeFile('./json/mute.json', JSON.stringify(mutedb), err => {
      if (err) console.log(err)
    })
    if (mutedb[message.channel.guild.id].status) {
      let muterole = message.guild.roles.cache.find(
        (role) => role.name === 'muted'
      )
      if (!muterole) {
        try {
          muterole = await message.guild.roles.create({
            data: { name: 'muted', permissions: [] }
          })
          message.guild.channels.cache.forEach(async (channel, id) => {
            await channel.createOverwrite(muterole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false
            })
          })
        } catch (e) {
          console.log(e)
          message.channel
            .send(
              "**⚠️ Je n'ai pas la permission modifier les salons et/ou de créer des roles. ⚠️** "
            )
            .then((msg) => {
              msg.delete({ timeout: 5000 })
            })
        }
      }
      message.channel
        .send('**Le mode anti spam a été activé✅** ')
        .then((msg) => {
          message.delete({ timeout: 300 })
          msg.delete({ timeout: 5000 })
        })
    } else {
      message.channel
        .send('**Le mode anti spam a été désactivé ❌**')
        .then((msg) => {
          message.delete({ timeout: 300 })
          msg.delete({ timeout: 5000 })
        })
    }
  } else if (type === 'muterole') {
    let role
    try {
      role = message.mentions.roles.first().id
    } catch (error) {
      role = undefined
    }
    // Check Channel
    if (role === undefined) {
      return message.channel.send('**⚠️ Role Introuvable ⚠️** ').then((msg) => {
        message.delete({ timeout: 300 })
        msg.delete({ timeout: 5000 })
      })
    }
    await mongo().then(async (mongoose) => {
      try {
        await muteschema.findOneAndUpdate(
          { _id: message.guild.id },
          { _id: message.guild.id, rolemodo: role },
          { upsert: true }
        )
        message.channel
          .send('**Le setup du role qui peut mute est fait avec succès ✅** ')
          .then((msg) => {
            message.delete({ timeout: 300 })
            msg.delete({ timeout: 5000 })
          })
      } catch (error) {
        message.channel.send(`**ERROR : ${error}** `).then((msg) => {
          message.delete({ timeout: 300 })
          msg.delete({ timeout: 5000 })
        })
      } finally {
        mongoose.connection.close()
      }
    })
  }
}

module.exports.help = {
  name: 'setup',
  description: 'Configure le bot pour le serveur'
}
