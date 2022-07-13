const {Discord, MessageEmbed} = require('discord.js')
const { QuickDB } = require("quick.db");
const db = new QuickDB()

module.exports = {
    name: 'setjoin',
    aliases: ['sj'],
    run: async (client, message, args) => {

        let canalboa = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if (!message.member.permissions.has("MANAGE_GUILD")) {
            return message.reply({ embeds: [
                    new MessageEmbed()
                    .setDescription(`Você nao tem permissão para utilizar este comando.`)
                    .setColor('PURPLE')
                ]
            })

        } else

        if (!canalboa) {
            return message.reply({ embeds: [
                    new MessageEmbed()
                    .setDescription(`\`e!setjoin [#canal]\``)
                    .setColor('PURPLE')
                ]
            })

        } else {

        db.set(`boasvindachannel_${message.guild.id}`, canalboa.id)

        const embed = new MessageEmbed()
            .setDescription(`✅ | O canal ${canalboa} agora é o canal de join logs!`)
            .setColor('PURPLE')

        message.reply({ embeds: [embed] });

        }

    }

} 