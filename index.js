const discord = require("discord.js");
const botconfig = require("./botconfig.json");

const client = new discord.Client();
client.login(botconfig.token);

client.on("ready", async () => {
    
    console.log(`${client.user.username} is online.`);
    client.user.setActivity("testing", {type: "faze"});
    
});

client.on("message", async message => {

    if(message.author.bot) return;

    if(message.channel.type == "dm") return;

    var prefix = botconfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    if(command === `${prefix}hallo`){
        return message.channel.send("Hallo!");
    }

    if(command === `${prefix}botinfo`) {

      const totalCount = message.guild.memberCount

        var botEmbed = new discord.MessageEmbed()
            .setTitle("Bot info")
            .addField("Bot naam", client.user.username)
            .setDescription("Ik ben de bot van leeuw network!")
            .setColor("#ff0000")
            .addField('Totaal members', totalCount)
            .addFields(
                {name: "maaker", value: "Developer ➠ Arne"},
                {name: "Owner's en developer", value: "Owner ➠ Jip, Owner ➠ Luna, Co Owner ➠ Jenne, Developer ➠ Arne, Co-owner ➠ Milan"}
            )
            .setThumbnail("https://i.postimg.cc/90CHc7ZS/xxl.jpg")
            .setFooter("Nice bot toch!", "https://i.postimg.cc/90CHc7ZS/xxl.jpg")
            .setTimestamp();

        return message.channel.send(botEmbed);
    }

    if(command === `${prefix}serverinfo`) {

        const totalCount = message.guild.memberCount
  
          var botEmbed = new discord.MessageEmbed()
              .setTitle("Bot info")
              .setDescription("Ik ben de ultimate developer!")
              .setColor("#ff0000")
              .addFields(
                {name: "Je bent deze server gejoint op: ", value: message.member.joinedAt},
                {name: "totaal members + bot's", value:message.guild.memberCount},
                {name: "maaker van de server", value: "Owner ➠ Jip"},
                {name: "Owner's en developer", value: "Owner ➠ Jip, Owner ➠ Luna, Co Owner ➠ Jenne, Developer ➠ Arne, Co-owner ➠ Milan"}
            );
  
          return message.channel.send(botEmbed);

      }

      if(command === `${prefix}help`) {

        const totalCount = message.guild.memberCount
  
          var botEmbed = new discord.MessageEmbed()
              .setTitle("alle commands voor members")
              .setDescription("Hopelijk helpt jullie dit!")
              .setColor("#ff0000")
              .addFields(
                {name: ":botinfo", value: "voor alle info over mij!"},
                {name: ":serverinfo", value: "voor alle info over deze server!"},
                {name: ":help", value: "voor alle commands die ik kan!"}
            );
  
          return message.channel.send(botEmbed);

      }

      if(command === `${prefix}kick`) {

        // kick @spelerNaam redenen hier

        var args = message.content.slice(prefix.length).split(/ +/);

        if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Jij hebt deze premission niet als jij dit wel zou hebben stuur dan een dm naar de owner of maak een ticket aan A.U.B.");

        if(!message.guild.me.hasPermission("KICK_MEMBERS"))return message.reply("Jij hebt deze premission niet als jij dit wel zou hebben stuur dan een dm naar de owner of maak een ticket aan A.U.B.");

        if(!args[1]) return message.reply("Je hebt geen gebruiker opgegeven probeer het eens opnieuw A.U.B");

        if(!args[2]) return message.reply("Je hebt geen redenen opgegeven probeer het eens opnieuw met redenen A.U.B");

        var kickUser = message.guild.member.user || message.guild.members.cache.get(args[1]);
        //essage.guild.member(user)
        var reason = args.slice(2).join(" ");

        if(kickUser) return message.reply("Deze gebruiker is niet gevonden probeer het opnieuw A.U.B.");

        var embedPrompt = new discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Gelieve binnen 30 seconden te reageren A.U.B.")
            .setDescription(`Weet je zeker dat je ${kickUser} moet kicken?`);

        var embed = new discord.MessageEmbed()
            .setColor("#ff0000")
            .setFooter(message.member.displayName)
            .setTimestamp()
            .setDescription(`**Gekickt: ** ${kickUser} (${kickUser})
            **Gekickt door:** ${message.author}
            **Redenen: ** ${reason}`);

        message.channel.send(embedPrompt).then(async msg => {
     
            var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);
     
            if(emoji === "✅"){

                msg.delete();

                kickUser.kick(reason).catch(err => {
                    if (err) return message.reply("Er is iets fout gelopen probeer het opnieuw A.U.B.");
                });

                message.channel.send(embed);

            }else if(emoji === "❌"){

              msg.delete();

              message.reply("Je hebt de kick geanuleerd").then(m => m.delete(5000));

            }
        
        })

      }

});


 async function promptMessage(message, author, time, reactions){
 
    time *= 1000;
 
    for(const reaction of reactions){
       await message.react(reaction);
    }

    var filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

   return message.awaitReactions(filter, {max:1, time: time}).then(collected => collected.first() && collected.first().emoji.name); 

}