const { Client } = require('discord.js')
const { readdirSync } = require('fs') // Native Functions
const { join } = require('path') // Native Functions

module.exports = class extends Client {
    constructor (options) {
        super(options)

        this.commands = []
        this.loadCommands()
        this.loadEvents()

        //console.log(this.commands)
    }

    registryCommands() {
        // Temporary - 1 server
        this.guilds.cache.get(process.env.DISCORD_GUILD_ID).commands.set(this.commands)

        // Global - may take to an hour to have all commands prepared
        // this.application.commands.set(this.commands)
    }

    loadCommands(path = 'src/commands') {
        const categories = readdirSync(path) //'src/commands'

        for (const category of categories) {
            const commands = readdirSync(`${path}/${category}`) //src/commands/info | for example

            for (const command of commands) {
                const commandClass = require(join(process.cwd(), `${path}/${category}/${command}`)) //src/commands/info/ping.js | for example
                const cmd = new (commandClass)(this) // This -> command

                this.commands.push(cmd)
                //console.log(`Command ${cmd.name} succesfully loaded!`)
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

                this.on(evt.name, evt.run) // 'Ready', 'run () => {. . .}'
                //console.log(`Event ${evt.name} succesfully loaded!`)
            }
        }
    }
}