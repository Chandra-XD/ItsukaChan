import fs from 'fs'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn }) => {
	let d = new Date
            let date = d.toLocaleDateString('id', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
let a = await conn.reply(global.owner[0] + '@s.whatsapp.net', `*🗓️ Database:* ${date}`, null)
conn.sendFile(global.owner[0] + '@s.whatsapp.net', fs.readFileSync('./database.json'), 'database.json', '', 0, 0, { mimetype: 'application/json', quoted: a})
await apivisit
 }
 
handler.help = ['backup']
handler.tags = ['owner']
handler.command = /^(b|backup)$/i

export default handler