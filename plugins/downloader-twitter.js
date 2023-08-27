import axios from 'axios'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, text }) => {
	if (!text) throw 'Input URL'
	if (!text.match(/(twitter.com)/gi)) throw `Invalid *URL*`
	try {
	let res = (await axios.get(API('can', '/api/download/twitter', { url: text }))).data;
	await m.reply('Sedang diproses...')
	await apivisit
	conn.sendFile(m.chat, res.result.HD || res.result.SD, "twt.mp4", res.result.desc, m)
  } catch (e) {
    console.log(e)
    throw `Error`
  }
}
handler.help = ['twitter'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.alias = ['twt', 'twtdl', 'twitter', 'twitterdl']
handler.command = /^((twt|twitter)(dl)?)$/i
export default handler
