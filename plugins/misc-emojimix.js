import fetch from 'node-fetch'
import { Sticker } from 'wa-sticker-formatter'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	let [emo1, emo2] = text.split`+`
	if (!(emo1 && emo2)) throw `Ex: ${usedPrefix+command} ${decodeURI('%F0%9F%92%80')}+${decodeURI('%F0%9F%92%80')}`
	let url = `https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${emo1}_${emo2}`
	let res = await (await fetch(url)).json()
	if (!res.results.length) throw 'An error occurred'
	for (let x of res.results) {
		let stiker = await (new Sticker(x.url, { type: 'full', categories: x.tags })).toMessage()
		conn.sendMessage(m.chat, stiker, { quoted: m })
	}
}
handler.help = ['emojimix']
handler.tags = ['misc']
handler.command = /^(emojimix)$/i

export default handler
