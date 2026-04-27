import { TMP } from '../lib/tempfile.js';
		
let handler = async (m, { conn, command }) => {
    let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || ''
	if (!mime) throw 'No media found'
	let media = await q.download()
	let link = await TMP(media)
	if (link.message) throw link.message
	await conn.reply(m.chat, link, m)
}
handler.alias = handler.command = handler.help = ["tmpf"]
handler.tags = ["internet"]
export default handler