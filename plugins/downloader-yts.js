import yts from 'yt-search'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, text, usedPrefix: _p }) => {
	if (!text) throw 'Query??'
	let res = (await yts(text)).videos 
	if (!res.length) throw `Query "${text}" Not Found`
	let arr = [], arr2 = []
	for (let x of res) arr.push({ title: x.title, description: `Uploaded ${x.ago || '-'}, ${parseInt(x.views).toLocaleString()} views`, rowId: `${_p}yta ${x.url}` })
	for (let x of res) arr2.push({ title: x.title, description: `Uploaded ${x.ago}, ${parseInt(x.views).toLocaleString()} views`, rowId: `${_p}ytv ${x.url}` })
	await conn.sendMessage(m.chat, { text: `Result From: ${text}`, footer: null, title: null, buttonText: 'Result', sections: [{ title: 'Audio', rows: arr }, { title: 'Video', rows: arr2 }] }, { quoted: m })
	await apivisit
}
handler.help = ['earch'].map(v => 'yts' + v + ' <query>')
handler.tags = ['tools']
handler.command = /^yts(earch)?$/i
export default handler