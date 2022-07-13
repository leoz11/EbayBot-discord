const { Client, Intents, MessageEmbed, Message} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const config = require("./config.json");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

client.login(config.token);

client.on("ready", () => {
  console.log("✅ ESTOU ONLINE! BEM EU!");
  client.user.setActivity("Bem eu! Prefix: e!")
});

client.on("messageCreate", msg => {
  if (msg.content === "bom dia") {
      msg.reply("bom diaaaa")
  }
})

client.on("messageCreate", msg => {
  if (msg.content === "boa tarde") {
      msg.reply("bom tardeee")
  }
})

client.on("messageCreate", msg => {
  if (msg.content === "boa noite") {
      msg.reply("boa noiteee")
  }
})

client.on("messageCreate", message =>{
  if(message.author.bot) return;
  if(message.channel.type == "DM") return;
  if(!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
  if(message.content.startsWith(`<@!${client.user.id}`) || message.content.startsWith(`<@${client.user.id}>`)) return;

  const args = message.content
  .trim().slice(config.prefix.length)
  .split(/ +/g);
  const command = args.shift().toLowerCase();

try {
  const commandFile = require(`./commands/${command}.js`)
  commandFile.run(client, message, args);
} catch (err) {
  console.error('Erro:' + err);
}

})

client.on('guildMemberRemove', async (member) => {

  const canalleave = member.guild.channels.cache.get((await db.get(`channelgb_${member.guild.id}`)))
  
    if (canalleave === null || canalleave === false) return;
  
    let embed = new MessageEmbed()
    .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
    .setTitle(`Nightfall logs`)
    .setDescription(`${member.user} saiu do servidor.`)
    .setColor('PURPLE')
    canalleave.send({ embeds: [embed]})
    

})

client.on('guildMemberAdd', async (member, message) => {
  const canalboa = member.guild.channels.cache.get((await db.get(`boasvindachannel_${member.guild.id}`)))
  if (canalboa === null) return;
  let embed = new MessageEmbed()
  .setDescription(`࿐ ࿔*:･ﾟSeja bem-vindo(a), ${member.user}.
  
  ➩ Passe em <#984225914290331682>

  ➩ Faça seu registro <#984605431060131882>

  → Agradecemos pela sua atenção!
  
  `)
  .setColor('PURPLE')
  .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
  .setAuthor({ name: member.guild.name, iconURL: member.guild.iconURL({ dynamic: true })})
  .setImage('https://media.discordapp.net/attachments/948434168445018133/985198154314051654/D9513EA1-1CBA-4F48-89C9-8B44D11204AD.gif?width=450&height=333')
  canalboa.send({ content: `${member.user}`, embeds: [embed] })
  
}) 

client.on("guildMemberAdd", async (member) => {

  let cargo = member.guild.roles.cache.get("984201143053877258"); 

  if (!cargo) return console.log(`O cargo configurado no script, não existe no servidor ${member.guild.name}.`); // Verificando se o cargo existe.

  try {
      member.roles.add(cargo.id) 
  } catch (e) {
      console.log("Autorole:\n"+e) 
  }

})




