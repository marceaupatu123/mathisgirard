exports.run = async (client, message, args) =>  {
  if (message.channel.type === "dm") {
    return message.channel
      .send("**⚠️ Cette commande ne peut pas s'effectuer en DM ⚠️** ")
      .then((msg) => {
        message.delete({ timeout: 300 });
        msg.delete({ timeout: 5000 });
      });
  }
  if (!args[0] || !args[1]) {
    return message.channel
      .send(
        "**⚠️ Vérifier votre commande `muteallonevent [on/off] [nom du salon]` ⚠️** "
      )
      .then((msg) => {
        message.delete({ timeout: 300 });
        msg.delete({ timeout: 5000 });
      });
  }

  const Discord = require("discord.js");
  const functiontools = require("../main");
  let type = args[0].toLowerCase();
  let salon = args.slice(1).join(' ').toLowerCase();
  let channelid = ""
  // const qui =
  //   functiontools.getMoreUsersFromMention(args[1], message) ||
  //   functiontools.getChannelFromMention(args[1]) ||
  //   functiontools.getmembersbyroles(args[1], message) ||
  //   message.mentions.members.first()
  // const phrase = args.slice(2).join(' ')
  
  const guildavatar = message.guild.iconURL({ format: "png" });
  const author = message.author;
  const logscmpc = message.guild.channels.cache.get("789476900052795392");
  const animrole = "809860529907826725" || "810194203484487730"
  const covid =
    client.guilds.cache.get("789429664149274664") || "La France Libre";

  if (message.guild.id === covid.id) {
    // Check variable
    if (!type) {
      message.channel
        .send("**⚠️ Veuillez spécifier un état (on/off) ⚠️** ")
        .then((msg) => {
          message.delete({ timeout: 300 });
          msg.delete({ timeout: 5000 });
        });
      return;
    } else if (type !== "on" && type !== "off") {
      message.channel.send("⚠️ Etat invalide (on/off) ⚠️ ").then((msg) => {
        message.delete({ timeout: 300 });
        msg.delete({ timeout: 5000 });
      });
      return;
    } else if (type === "on") {
      if (!message.member.roles.cache.has(animrole)) {
        message.channel
          .send("**Tu n'as pas la permission de faire ça** ⛔️ ")
          .then((msg) => {
            message.delete({ timeout: 300 });
            msg.delete({ timeout: 5000 });
          });
        return;
      }
        type = true
      } else if (type === "off") {
        if (!message.member.roles.cache.has(animrole)) {
          message.channel
            .send("**Tu n'as pas la permission de faire ça** ⛔️ ")
            .then((msg) => {
              message.delete({ timeout: 300 });
              msg.delete({ timeout: 5000 });
            });
          return;
        }
        type = false;
      }

   if (salon.includes("among")) {
channelid = "809824389183832085"
   } else if (salon.includes("ciné")) {
    channelid = "807314955564220467"    
   } else if (salon.includes("trol")) {
    channelid = "810112982532227083"
   } else {
   return message.channel.send("⚠️ Salon Invalide ! Les salons valides sont : **among us, cinéma, troll**⚠️ ").then((msg) => {
      message.delete({ timeout: 300 });
      msg.delete({ timeout: 5000 });
    });
   }

   if (type === true) {
channelid = message.channel.guild.channels.cache.get(channelid).members
channelid.forEach(async element => {
  await element.edit({mute:true})
});
 return message.channel.send("Tout le monde à été mute🔇").then((msg) => {
  message.delete({ timeout: 300 });
  msg.delete({ timeout: 5000 });
});
} else {
    channelid = message.channel.guild.channels.cache.get(channelid).members
    channelid.forEach(async element => {
      await element.edit({mute:false})
    })
     return message.channel.send("Les gens sont démutes 🔊").then((msg) => {
      message.delete({ timeout: 300 });
      msg.delete({ timeout: 5000 });
    });
   }

  } else {
    // Dire qu tu dois pas être sur ce serveur
  }
};
module.exports.help = {
  name: "muteallonevent",
  description: "",
};
