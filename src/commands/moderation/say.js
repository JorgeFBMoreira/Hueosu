const Command = require('../../structures/Command')

const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'say',
            description: 'Make the bot say something',
            options: [
                {
                    name: 'channel',
                    type: 'CHANNEL',
                    description: 'Channel to send the message',
                    required: true
            
                },

                {
                    name: 'message',
                    type: 'STRING',
                    description: 'Message to be sent',
                    required: true
                }
            ]
        })
    }

    run = (interaction) => {
        const channel = interaction.options.getChannel('channel')

        if(!['GUILD_TEXT', 'GUILD_ANNOUNCEMENTS'].includes(channel.type)) return interaction.reply({
            content: 'ERRO | Inform a text channel or announcement channel',
            ephemeral: true
        })

        const message = interaction.options.getString('message')

        const embed = new MessageEmbed()
            .setTitle(`A message was sent to this channel`)
            .setDescription(message)
            .setColor('#00F0F0')
            .setTimestamp()

        channel.send({
            content: message,
            embeds: [embed]
        })
            .then(() => interaction.reply({
                content: `Message succesfully sent to \`${channel.name}\``,
                ephemeral: true
            }))
            .catch(() => interaction.reply({
                content: 'ERRO | Error trying to send a message to a channel',
                ephemeral: true
            }))
    }
}