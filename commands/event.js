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
        "**⚠️ Vérifier votre commande `event [on/off] [nom du salon]` ⚠️** "
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
  let channelid2 
  // const qui =
  //   functiontools.getMoreUsersFromMention(args[1], message) ||
  //   functiontools.getChannelFromMention(args[1]) ||
  //   functiontools.getmembersbyroles(args[1], message) ||
  //   message.mentions.members.first()
  // const phrase = args.slice(2).join(' ')
  
  const guildavatar = message.guild.iconURL({ format: "png" });
  const author = message.author;
  const logscmpc = message.guild.channels.cache.get("789476900052795392");
  const animrole = "809860529907826725"
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
    channelid2 = "809915254694871090" 
   } else if (salon.includes("trol")) {
    channelid = "810112982532227083"
    channelid2 = "810113297718181898" 
   } else {
   return message.channel.send("⚠️ Salon Invalide ! Les salons valides sont : **among us, cinéma, troll**⚠️ ").then((msg) => {
      message.delete({ timeout: 300 });
      msg.delete({ timeout: 5000 });
    });
   }

   if (type === true) {
channelid = message.channel.guild.channels.cache.get(channelid)
await channelid.createOverwrite(message.channel.guild.roles.cache.get("789430693541183518"), {
  VIEW_CHANNEL: true,
  CONNECT: true
 }, 'Event lancé')
if (channelid2) {
  if(channelid2 == '810246844273393744') {
    channelid2 =message.channel.guild.channels.cache.get(channelid2)
    await channelid2.createOverwrite(message.channel.guild.roles.cache.get("789430693541183518"), {
      VIEW_CHANNEL: true,
      SEND_MESSAGES: false
     }, 'Event lancé')
  } else {
    channelid2 =message.channel.guild.channels.cache.get(channelid2)
    await channelid2.createOverwrite(message.channel.guild.roles.cache.get("789430693541183518"), {
      VIEW_CHANNEL: true,
      SEND_MESSAGES: true
     }, 'Event lancé')
  }
}
 return message.channel.send("🚪 Le Salon est ouvert pour tous ! ✅ ").then((msg) => {
  message.delete({ timeout: 300 });
  msg.delete({ timeout: 5000 });
});
} else {
    channelid = message.channel.guild.channels.cache.get(channelid)
    await channelid.createOverwrite(message.channel.guild.roles.cache.get("789430693541183518"), {
      VIEW_CHANNEL: false,
      CONNECT: false
     }, 'Event lancé').catch(() => { message.channel.send("Je n'ai pas la permission de faire ça :(")})
     
     if (channelid2) {
      channelid2 =message.channel.guild.channels.cache.get(channelid2)
      if(channelid2 == '810246844273393744') {
        channelid2 =message.channel.guild.channels.cache.get(channelid2)
        await channelid2.createOverwrite(message.channel.guild.roles.cache.get("789430693541183518"), {
          VIEW_CHANNEL: false,
          SEND_MESSAGES: false
         }, 'Event lancé')
      } else {
      await channelid2.createOverwrite(message.channel.guild.roles.cache.get("789430693541183518"), {
        VIEW_CHANNEL: false,
        SEND_MESSAGES: false
       }, 'Event lancé')
      }
    }
     return message.channel.send("🚪 Le Salon est fermé pour tous ! ❌").then((msg) => {
      message.delete({ timeout: 300 });
      msg.delete({ timeout: 5000 });
    });
   }

  } else {
    // Dire qu tu dois pas être sur ce serveur
  }
};
module.exports.help = {
  name: "event",
  description: "",
};
