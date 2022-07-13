const {Discord, MessageEmbed} = require('discord.js')
module.exports = {
    name: "clear",


run: async(client, message, args) => {

    let leo_author = message.author;
    let sem_perm = "você não possui permissão para este comando.`";
    let leo_numeros = args[0];

  if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(`:x: | ${leo_author}, ${sem_perm}.`);

  const leo_contador_msg_del = parseInt(args[0], 10);

  let leo_msg_erro_msgs_del = "insira um número entre 1-99.";

  if (!leo_contador_msg_del || leo_contador_msg_del < 1 || leo_contador_msg_del > 99) return message.channel.send(`:x: | ${leo_author} ${leo_msg_erro_msgs_del}`);

  const leo_apagando_mensagem = await message.channel.messages.fetch({
    limit: leo_contador_msg_del + 1
  });
  message.channel.bulkDelete(leo_apagando_mensagem);
  let msg_nao_embed = `✅ | ${leo_author} apagou \`${leo_numeros}\` mensagens!`;
  message.channel.send(msg_nao_embed)
}};