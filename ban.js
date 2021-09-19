const discord = require("discord.js")

module.exports = {
    name: "ban",
    discription: "ban command",

    async run (bot, message, args){
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Je kan dit commando niet gebruiken!")

        const mentionMember = member.mentions.members.first();
        let reason = args.slice(1).join(""); //.ban args(0) aka @member args (1) aka reason
        if (!reason) reason = "Geen redenen";
        
        var banembed = new discord.MessageEmbed()
        .setTitle('Je bent geband van', $(message.guild.name))
        .setDescription("reason:", $(reason))
        .setColor("#ff0000")
        .setTimestamp()
        .setFooter(bot.user.tag, bot.user.displayAvatarURL())

        if (args[0]) return message.channel.send("Je moet een user specificeren om te bannen!");

        if (!mentionMember) return message.channel.send("Deze gebruiker is geen geldige gebruiker / bevindt zich niet meer op de server!");

        if (!mentionMember.banable) return message.channel.send("Ik kon deze gebruiker niet bannen!");
        
        await mentionMember.send(embed);
        await mentionMember.ban((
            reason => reason
        )).then(() => message.channel.send("Met succes gebant:", mentionMember.user.tag));
    }
}