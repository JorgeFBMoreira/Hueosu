const Command = require('../../structures/Command')

module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            description: 'Bot ping',
        })
    }

    run = (interaction) => {
        interaction.reply({
            content: `Ping: \`${this.client.ws.ping}\`ms`,
            ephemeral: true
        })
    }
}