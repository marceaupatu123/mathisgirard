const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client();
const config = require("./config.json");
client.config = config; // Acceder

fs.readdir("./events", (err, files) => {
  // On regarde tout ce qu'il y a dans le dossier "events"
  if (err) return console.log(err); // On regarde si y a une erreur
  files.forEach((files) => {
    // On fait ça pour chaque élément
    const event = require(`./events/${files}`); // On prend le fichier
    const eventName = files.split(".")[0]; // On garde que le nom
    client.on(eventName, event.bind(null, client)); // On lance l'event
  });
});

client.commands = new Discord.Collection();

fs.readdir("./commands", (err, files) => {

  let filter = files.filter(f => f.split(".").pop() == "js")
  if (filter.length <= 0) return console.log("Aucune commande trouvé")

  if (err) return console.log(err); // Look at error
  filter.forEach((files) => {
    const props = require(`./commands/${files}`); // On prend le fichier
    console.log(`Lancement de ${files}`);
    client.commands.set(props.help.nae, props); // On fait en sorte de pouvoir utiliser la commande
  });
});

module.exports.checkusermods = function (user) {
  if (user.roles.cache.has("770657712870391810")) return true;
  else return false;
};
client.login(config.token);
