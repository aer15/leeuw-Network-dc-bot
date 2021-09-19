const discord = require("discord.js")

module.exports = {
    name: "kick",
    discription: "kick command",

    async run (bot, message, args){
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Je kan dit commando niet gebruiken!")

        const mentionMember = member.mentions.members.first();
        let reason = args.slice(1).join(""); //.kick args(0) aka @member args (1) aka reason
        if (!reason) reason = "Geen redenen";
        
        var kickembed = new discord.MessageEmbed()
        .setTitle('Je bent gekickt van', $(message.guild.name))
        .setDescription("reason:", $(reason))
        .setColor("#ff0000")
        .setTimestamp()
        .setFooter(bot.user.tag, bot.user.displayAvatarURL())

        if (args[0]) return message.channel.send("Je moet een user specificeren om te kicken!");

        if (!mentionMember) return message.channel.send("Deze gebruiker is geen geldige gebruiker / bevindt zich niet meer op de server!");

        if (!mentionMember.kickable) return message.channel.send("Ik kon deze gebruiker niet kicken!");


        try {
            await mentionMember.send(kickembed);
        } catch (err) {

        }

        try {
            await mentionMember.kick(reason)
        } catch (err) {
            message.channel.send("Ik kon deze gebruiker niet kicken! sorry...")
        }
    }
}