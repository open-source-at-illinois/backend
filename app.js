require('dotenv').config();
const { SERVER_PORT, DISCORD_TOKEN, CHANNEL_ID } = process.env;

const express = require('express')
const discord = require('discord.js');

const app = express()
const discordBot = new discord.Client();

app.use(express.json());

discordBot.once('ready', () => {
    console.log('Discord bot is ready!')
})

discordBot.login(DISCORD_TOKEN);

app.listen(SERVER_PORT, () => {
    console.log(`Magic at ${SERVER_PORT}`);
})

app.get('/messages', (req, res, next) => {
    console.log('GET @ messages')
    const channel = discordBot.channels.get(CHANNEL_ID);
    channel.fetchMessages({ limit: req.query.count || 3 })
        .then(messages => {
            res.send(messages.map(m => { 
                return {
                    created: new Date(m.createdTimestamp).toISOString(), 
                    content: m.content
                }
            }))
        })
})
 