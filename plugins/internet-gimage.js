import { googleImage } from '@bochilteam/scraper'
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `Use example ${usedPrefix + command} Minecraft`
const res = await googleImage(text)
let image = res.getRandom()
let link = image
conn.sendFile(m.chat, link, 'gimage.jpg', `Result from : `+ text, m)
}
handler.help = ['gimage'].map(v => v + ' <query>')
handler.tags = ['internet']
handler.command = /^(gimage|googleimage)$/i
export default handler
