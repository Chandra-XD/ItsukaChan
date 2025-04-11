import { apivisit } from './kanghit.js'

let handler = async (m) => {
    global.db.data.chats[m.chat].isBanned = false
    await m.reply('Done!')
    await apivisit
}
handler.help = ['unbanchat']
handler.tags = ['owner']
handler.command = /^(unbanchat|ubnc)$/i
handler.owner = true

export default handler