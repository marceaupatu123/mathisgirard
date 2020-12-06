exports.run = (client, message) => {
  const utile = [];
  const Discord = require("discord.js");

  const embed = new Discord.MessageEmbed()
    .setTitle(`Commande ${message.author.username}`)
    .setAuthor(
      "Listes des commandes",
      "https://dzcharikati.net/wp-content/uploads/2019/08/scales-of-justice-logo.jpg"
    )
    .setColor("RANDOM")
    .addFields(
      {
        name: "Modération",
        value: "`Clear` : Permet de supprimer un montant donné de messages. *(MANAGE_MESSAGES PERM)*",
        inline: true,
      },
      {
        name: "Utile",
        value: "`Ping` : Permet de connaitre la latence du bot.\n`Report`: Permet de report un problèle à la moderation.",
        inline: true,
      },
      {
        name: "Administration",
        value: "`Setup` : Permet de setup le serveur pour le bot. *(MANAGE_GUILD PERM)*",
        inline: true,
      },
      {
        name: "Serveur Coronavirus",
        value:
          "`Conseil` : **[COMPATIBLE MENTION+]** Permet de faire un mesage à envoyer à une personne ou un channel en tant que membre d'un conseil.",
      }
    )

    .setFooter(
      "Bot créé par Dominus_Marceau#8457",
      client.users.cache.get("284036155928870912").avatarURL({ format: "png" })
    )
    .setTimestamp();
  message.channel.send(embed);
  message.delete({ timeout: 300 });
};

module.exports.help = {
  name: "help",
  description: "",
};
