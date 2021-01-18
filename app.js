const express = require('express')
const app = express()
const discord = require('discord.js');
const discordBot = new discord.Client();
const routes = express.Router()

routes.get('/messages', (req, res, next) => {
    console.log('GET @ messages')
    const channel = discordBot.channels.cache.get("746560917231370281")
    channel.messages.fetch({ limit: req.query.count || 3 }).then(messages => {
        res.send(messages.map(m => { 
            return {
                created: new Date(m.createdTimestamp).toISOString(), 
                content: m.content
             }
            }))
        }
    )
})

discordBot.once('ready', () => {
    console.log('Ready!')
})


discordBot.on('message', messageAction)
app.use(routes)

discordBot.login('ODAwNTQxOTIxOTA2NTI0MjAx.YAToww.WSrGkEKZK9juM5o_AL5yRX7KW8E')
app.listen(3000)
