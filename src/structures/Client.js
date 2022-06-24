const { Client } = require('discord.js')
const { readdirSync } = require('fs') // Native Functions
const { join } = require('path') // Native Functions

module.exports = class extends Client {
    constructor (options) {
        super(options)

        this.commands = []
        this.loadCommands()
        this.loadEvents()
    }

    registryCommands() {
        this.guilds.cache.get(process.env.DISCORD_GUILD_ID).commands.set(this.commands)
    }

    loadCommands(path = 'src/commands') {
        const categories = readdirSync(path)

        for (const category of categories) {
            const commands = readdirSync(`${path}/${category}`)

            for (const command of commands) {
                const commandClass = require(join(process.cwd(), `${path}/${category}/${command}`))
                const cmd = new (commandClass)(this)

                this.commands.push(cmd)
            }
        }
    }

    loadEvents(path = 'src/events') {
        const categories = readdirSync(path)

        for (const category of categories) {
            const events = readdirSync(`${path}/${category}`)

            for (const event of events) {
                const eventClass = require(join(process.cwd(), `${path}/${category}/${event}`))
                const evt = new (eventClass)(this)

                this.on(evt.name, evt.run)
            }
        }
    }
}