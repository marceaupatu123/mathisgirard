const Discord = require("discord.js");
const fs = require("fs");
const Enmap = require("enmap");

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

client.commands = new Enmap();

fs.readdir("./commands", (err, files) => {
  // On regarde tout le dossier "commands"
  if (err) return console.log(err); // Look at error
  files.forEach((files) => {
    // For each element
    if (!files.endsWith(".js")) return; // On vérifie que c bien un .js
    const props = require(`./commands/${files}`); // On prend le fichier
    const commandName = files.split(".")[0];
    console.log(`Lancement de ${commandName}`);
    client.commands.set(commandName, props); // On fait en sorte de pouvoir utiliser la commande
  });
});

module.exports.checkusermods = function (user) {
  if (user.roles.cache.has("770657712870391810")) return true;
  else return false;
};
client.login(config.token);
