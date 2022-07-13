const {Discord, MessageEmbed} = require('discord.js');
const { QuickDB } = require("quick.db");
const db = new QuickDB()

module.exports = {

    name: "setleave",
    run: async (client, message, args) => {

        if (!message.member.permissions.has("MANAGE_GUILD")) {

        let embed = new MessageEmbed()
            .setDescription(`Você não tem permissão para utilizar este comando.`)
            .setColor('PURPLE');

        message.reply({ embeds: [embed] })
        
    } else {

        let canalleave = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if(!canalleave) {

            let embed_2 = new MessageEmbed()

            .setDescription(`\`e!setleave [#canal]\``) 
            .setColor('PURPLE')

            message.reply({ embeds: [embed_2] });
            
        } else if (canalleave) {

            db.set(`channelgb_${message.guild.id}`, canalleave.id)

            let embed_3 = new MessageEmbed()
            .setDescription(`✅ | O canal ${canalleave} agora é o canal de leave logs!`)
            .setColor('PURPLE')

            message.reply({ embeds: [embed_3]})
            }
        }
    }
}
