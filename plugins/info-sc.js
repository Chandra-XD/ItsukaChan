import { generateWAMessage, getContentType } from '@adiwajshing/baileys'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn }) => {
let gueh = `Chandra-XD`
let repositoy = `ItsukaChan`
ItsukaChan(m.chat, { 
text: `Bot ini menggunakan script dari :\n\nhttps://github.com/${gueh}/${repositoy}\n\nBtw jangan lupa di fork + kasi star nya kak ⭐`,
mentions:[m.sender],
contextInfo:{
mentionedJid:[m.sender],
"externalAdReply": {
"showAdAttribution": true,
"renderLargerThumbnail": false,
"title": 'Github - '+gueh+'/'+repositoy,
"containsAutoReply": true,
"mediaType": 1, 
"thumbnail": await (await (await import("node-fetch")).default("https://storage.pnggilajacn.my.id/file/my-profile.jpg")).buffer(),
"mediaUrl":  'https://github.com/Chandra-XD/ItsukaChan',
"sourceUrl": 'https://github.com/Chandra-XD/ItsukaChan'
}
}
})
await apivisit
}
handler.help = ['sc']
handler.tags = ['main']
handler.command = /^(sc|sourcecode)$/i
export default handler

async function ItsukaChan(chatId, message, options = {}){
    let generate = await generateWAMessage(chatId, message, options)
    let type2 = getContentType(generate.message)
    if ('contextInfo' in options) generate.message[type2].contextInfo = options?.contextInfo
    if ('contextInfo' in message) generate.message[type2].contextInfo = message?.contextInfo
    return await conn.relayMessage(chatId, generate.message, { messageId: generate.key.id })
}