import { File } from 'megajs'
import { fileTypeFromBuffer } from 'file-type'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, args }) => {
if (!args[0]) throw `Input *URL*`
if (!args[0].includes("mega")) return `Invalid *URL*`
let file = File.fromURL(args[0])
await m.reply('Sedang diproses...')
file = await file.loadAttributes()
let data = await file.downloadBuffer()
let mimetype = await fileTypeFromBuffer(data)
await conn.sendMessage(m.chat, { document: data, fileName: file.name, mimetype }, { quoted: m })
await apivisit
}
handler.help = ['ega'].map(v => 'm' + v + ' <url>')
handler.tags = ['downloader']
handler.command = /^mega(dl)?$/i 
export default handler