import { apivisit } from './kanghit.js'

let handler = async (m, { conn, args }) => {
    //if (!args[0] && !args[1]) return
    let user = m.quoted ? m.quoted.sender : args[0] + '@s.whatsapp.net'
    if (!user) return
    let pesn = await conn.reply(user, '~ 404 NOT FOUND ~', null)
    let pesnn = await conn.sendMessage(user, { react: { text: '', key: pesn.key }})
    await conn.reply(user, '1', pesnn)
    delay(500)
    await conn.reply(user, '2', pesnn)
    delay(500)
    await conn.reply(user, '3', pesnn)
    delay(2000)
    await conn.updateBlockStatus(user, 'block')
    m.reply('Done bug!')
    await apivisit
}
handler.command = /^(bug)$/i
handler.owner = true

export default handler

let delay = (ms) => {
        return new Promise((resolve, reject) => setTimeout(resolve, ms))
    }