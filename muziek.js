const { Player } = require("discord-player");
const { Message } = require("discord.js");
// Create a new Player (you don't need any API Key)
const player = new Player(client);
// To easily access the player
client.player = player;

const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

if(command === `${prefix}play`) {
    let track = await client.player.play(message.member.voice.channel, args[0], message.member.user.tag);
    message.channel.send(`Currently playing ${track.name}! - Requested by ${track.requestedBy}`);
}

if(command === `${prefix}stop`) {
    let track = await client.player.stop(message.guild.id);
    message.channel.send(`STOPPED`);
}