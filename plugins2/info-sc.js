import { apivisit } from './kanghit.js'

let handler = async (m, { conn }) => {
let res = API('can', '/api/cecan/random', {}, 'apikey')
let gueh = `Chandra-XD`
let repositoy = `ItsukaChan`
let templateButtons = [
    {index: 1, urlButton: {displayText: 'sᴀᴡᴇʀɪᴀ', url: `https://saweria.co/pnggilajacn` }},
    {index: 2, urlButton: {displayText: 'ᴛʀᴀᴋᴛᴇᴇʀ', url: `https://trakteer.id/pnggilajacn` }},
    {index: 3, quickReplyButton: {displayText: 'ᴏᴡɴᴇʀ', id: '.owner'}},
]
let templateMessage = {
location: { jpegThumbnail: await conn.resize(res, 200, 200)},
caption: `Bot ini menggunakan script dari :\n\nhttps://github.com/${gueh}/${repositoy}\n\nBtw jangan lupa di fork + kasi star nya kak ⭐`,
footer: wm,
templateButtons: templateButtons
}
await conn.sendMessage(m.chat, templateMessage, { quoted: m, ephemeralExpiration: global.ephemeral, forwardingScore: 99999, isForwarded: true })
await apivisit
}
handler.help = ['sc']
handler.tags = ['main']
handler.command = /^(sc|sourcecode)$/i
export default handler