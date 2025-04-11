import { fileIO, TMP, upSkizo } from '../lib/tempfile.js';
		
let handler = async (m, { conn, command }) => {
    let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || ''
	if (!mime) throw 'No media found'
	let media = await q.download()
	
	switch (command) {
	case "fileio": {
	let link = await fileIO(media)
	await conn.reply(m.chat, link, m) }
	break
	
	case "tmpf": {
	let link = await TMP(media)
	if (link.message) throw link.message
	await conn.reply(m.chat, link, m) }
	break
	
	case "upf": {
	let link = await upSkizo(media)
	await m.reply(JSON.stringify(link, null, 2)) }
	break
	
	}
}
handler.alias = handler.command = handler.help = ["upf", "tmpf", "fileio"]
handler.tags = ["internet"]
export default handler