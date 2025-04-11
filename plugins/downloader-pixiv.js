import { apivisit } from './kanghit.js'

let handler = async (m, { conn, text }) => {
	if (!text) throw 'Input Pixiv Url'
	if (!/https:\/\/www.pixiv.net\/en\/artworks\/[0-9]+/i.test(text)) throw 'Invalid Pixiv Url'
	try {
	let id = text.replace(/\D/g, '')
	await conn.sendMessage(m.chat, { react: { text: `🕑`, key: m.key }})
	let url = `https://pixiv.cat/`+ id +`.jpg`
	await conn.sendMessage(m.chat, { image: { url }, caption: text }, { quoted: m})
	await apivisit
	} catch (e) {
	throw `Error`
} }
handler.help = handler.alias = ['pixiv'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(pixiv)$/i
export default handler