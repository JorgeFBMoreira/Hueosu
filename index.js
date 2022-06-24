require("dotenv").config()
const Client = require('./src/structures/Client')

const client = new Client({
    intents: [
        'GUILDS',
        'GUILD_MEMBERS',
        'GUILD_MESSAGE_REACTIONS',
        'GUILD_MESSAGES',
        'GUILD_INVITES',
        'GUILD_VOICE_STATES',
        'GUILD_PRESENCES',
    ]
})
/*
client.once('ready', () => {
    console.log(`Bot ${client.user.username} successfully logged in.\n`)
})*/

client.login(process.env.DISCORD_BOT_TOKEN)