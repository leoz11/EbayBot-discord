const { MessageEmbed, Message } = require('discord.js');

module.exports = {
    name: 'avatar',
    author: "lionardo",
    aliases: ['av'],

    run: async(client, message, args) => {



        let member = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

        let msg = new MessageEmbed()
        .setTitle(member.tag)
        .setColor(`PURPLE`)
        .setImage(member.avatarURL({dynamic: true, size: 1024}))
        .setFooter(`Nightfall ⠂ 2022 `, message.author.displayAvatarURL ({format: "png"}));
        message.channel.send({ embeds: [msg] });

    }
}