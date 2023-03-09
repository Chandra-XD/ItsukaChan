import fetch from 'node-fetch'
import fs from 'fs'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn }) => {
let res = await fetch('https://raw.githubusercontent.com/Chandra-XD/cn-grabbed-result/main/text/bot/rules.txt')
let txt = await res.text()
let coey = await fs.readFileSync('./thumbnail.jpg')
let gueh = `Chandra-XD`
let repositoy = `ItsukaChan`
let tulisan = `*Hai kak ${conn.getName(m.sender)}, dibaca ya rulesnya*
${txt}
*────────────────────────*
`.trim()
let templateButtons = [
    {index: 1, urlButton: {displayText: 'sᴄʀɪᴘᴛ ʙᴏᴛ', url: `https://github.com/${gueh}/${repositoy}` }},
    {index: 2, quickReplyButton: {displayText: 'ᴏᴡɴᴇʀ', id: '.owner'}},
]
let templateMessage = {
location: { jpegThumbnail: await conn.resize(coey, 200, 200)},
caption: tulisan,
footer: wm,
templateButtons: templateButtons
}
await conn.sendMessage(m.chat, templateMessage, { quoted: m, ephemeralExpiration: global.ephemeral, forwardingScore: 99999, isForwarded: true })
await apivisit
}
handler.help = ['rules']
handler.tags = ['main']
handler.command = /^(rules|peraturan)$/i
export default handler