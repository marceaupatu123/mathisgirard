exports.run = (client, message, args) => {
    if (args[0] === 'voxfy') {
      message.reply('Hey i\'m voxfy')
    } else {
      message.reply('Bad guy')
    }
  }
  
  module.exports.help = {
    name: 'voxfy'
  }
  