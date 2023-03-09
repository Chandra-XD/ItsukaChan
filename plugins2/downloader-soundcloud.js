import axios from 'axios'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw m.reply('Putting *URL* SoundCloud...')
    if (!args[0].includes("soundcloud")) return m.reply(`_Invalid Url..._`)
    let res = (await axios.get(API('can', '/api/download/soundcloud', { url: args[0] } ))).data;
    if (!res.result.download) throw `Error`
	await m.reply('Sedang diproses...')
	let caption = `Title : ${res.result.title}\nDurasi : ${res.result.duration}\nQuality : ${res.result.quality}`
    let repl = await conn.sendMessage(m.chat, { audio: { url: res.result.download}, mimetype: 'audio/mpeg' }, { quoted: m })
    await conn.sendMessage(m.chat, { image: { url: res.result.thumbnail }, caption }, { quoted: repl })
    await apivisit
	// By Chandra XD
	// Follow bang
	// TikTok : @pnggilajacn
	// Github : https://github.com/Chandra-XD
	}
handler.help = ['soundcloud'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(soundcloud|scdl)$/i
export default handler