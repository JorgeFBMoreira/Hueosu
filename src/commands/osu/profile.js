const Command = require('../../structures/Command')
const axios = require('axios');

const { MessageEmbed } = require('discord.js')



// API
async function GET_OSU_USER_PROFILE(username, gamemode) {
    let response, error;

    try {
        let { data: data } = await axios.get(`${process.env.OSU_API_V2_URL}/users/${username}/${gamemode}`, {
            params: {
                'key': 'username',
            },

            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${process.env.OSU_API_V2_TOKEN}`
            },
        })

        response = data
    } catch (e) {
        error = e
    }
    
    return { response, error }
}






module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'test',
            description: 'Testing osu api',
            options: [
                {
                    name: 'username',
                    type: 'STRING',
                    description: 'Username',
                },

                {
                    type: 'STRING',
                    name: 'game_mode',
                    description: 'Game Mode',
                    choices: [
                        {
                            name: 'Standard',
                            value: 'osu'
                        }, {
                            name: 'Taiko',
                            value: 'taiko'
                        }, {
                            name: 'Catch',
                            value: 'fruits'
                        }, {
                            name: 'Mania',
                            value: 'mania'
                        },
                    ]
                },
            ],
        })
    }

    run = async (interaction) => {
        const username = interaction.options.getString("username") || 'yHuesos_'
        const gamemode = interaction.options.getString("game_mode") || 'osu'

        interaction.reply({
            content: 'Fetching data. . .'
        })

        const { response: profile, error } = await GET_OSU_USER_PROFILE(username, gamemode)

        if(error) {
            interaction.guild.channels.cache.get(process.env.ERROR_CHANNEL).send(`[**ERRO**] | ${error}`)

            console.log(error.response)

            interaction.editReply(' ')
            return interaction.followUp({
                content: `[**ERRO**] | ${error}`,
                ephemeral: true
            })
        }



        const embed = new MessageEmbed()
            .setColor('#00F0F0')
            .setTitle(`[ICON] osu!${gamemode} | Profile of ${profile.username}`)
            .setURL(`https://osu.ppy.sh/users/${profile.id}`)
            .setAuthor({ name: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}`, url: '' })
            .setDescription(`・**Ranking**: #${profile.statistics.global_rank} (:flag_${profile.country_code.toLowerCase()}: #${profile.statistics.country_rank})\n・**PP**: ${Math.round(profile.statistics.pp)}pp | **Accuracy**: ${Math.round(profile.statistics.hit_accuracy * 100) / 100}%\n・**Playcount**: ${profile.statistics.play_count} (${Math.round(Math.floor(profile.statistics.play_time / 3600))}h)\n\n・**Ranks**: \`SSH: ${profile.statistics.grade_counts.ssh} | SS: ${profile.statistics.grade_counts.ss} | SH: ${profile.statistics.grade_counts.sh} | S: ${profile.statistics.grade_counts.s} | A: ${profile.statistics.grade_counts.a}\``)
            .setThumbnail(profile.avatar_url)
            .setImage(profile.cover_url)
            .setFooter({ text: profile.is_online ? 'online' : 'offline', iconURL: '' });

        return interaction.editReply({
            content: ' ',
            embeds: [embed]
        })
    }
}