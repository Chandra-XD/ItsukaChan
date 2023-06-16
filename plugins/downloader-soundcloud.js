import axios from 'axios'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw m.reply('Putting *URL* SoundCloud...')
    try {
    let res = (await axios.get(API('can', '/api/download/soundcloud', { url: args[0] } ))).data;
	await m.reply('Sedang diproses...')
	let caption = `Title : ${res.result.title}\nDurasi : ${res.result.duration}\nQuality : ${res.result.quality}`
    let repl = await conn.sendMessage(m.chat, { audio: { url: res.result.download}, mimetype: 'audio/mpeg' }, { quoted: m })
    await conn.sendMessage(m.chat, { text: caption }, { quoted: repl })
    await apivisit
	// By Chandra XD
	// Follow bang
	// TikTok : @pnggilajacn
	// Github : https://github.com/Chandra-XD
	} catch (e) {
		console.log(e)
		m.reply(`Invalid Soundcloud URL / Terjadi Kesalahan.`)
	}
}
handler.help = ['soundcloud'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(soundcloud|scdl)$/i
export default handler