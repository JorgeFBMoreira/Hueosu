const Event = require('../../structures/Event')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'ready'
        })
    }

    run = () => {
        console.log(`Bot ${this.client.user.username} succesfully log in on ${this.client.guilds.cache.size} servers.`)
        this.client.registryCommands()
    }
}