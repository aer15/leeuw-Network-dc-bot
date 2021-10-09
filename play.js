const discord = require("discord.js");
const ytdl = require("ytdl-core");

module.exports.run = async (client, message, args) => {

    if(!message.member.voice.channel) return message.reply("Connecteer met een spaak kanaal");

    5

}

module.exports.help = {
    name: "play",
    description: "Geeft al de verschillende commando's",
    category: "Informatie"
}