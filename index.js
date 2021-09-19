const discord = require("discord.js");
const botconfig = require("./botconfig.json");

const client = new discord.Client();
client.login(botconfig.token);

client.on("ready", async () => {
    
  console.log(`${client.user.username} is online.`);
  client.user.setActivity("testing", {type: "faze"});
  
});

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
                {name: ":help", value: "voor alle commands die ik kan!"},
                {name: ":...", value: "er komen er nog meer aan"}
            );
  
          return message.channel.send(botEmbed);

              }      

});


client.login(process.env.TOKEN);