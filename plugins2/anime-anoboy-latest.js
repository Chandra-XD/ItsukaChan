import fetch from 'node-fetch'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, args }) => {
    let page = args[0] || `1`
    let ress = await fetch(`https://weeb-scraper.onrender.com/api/anoboy?page=` + page)
    if (!ress) throw 'Error 404 Not Found'
    let res = await ress.json()
    let v = res.data
	let arr = []
	for (let x of v) arr.push({ title: x.title, description: `${x.upload_time}`, rowId: `#anoboydl ${x.param}` })
	await conn.sendMessage(m.chat, { text: `Anoboy Latest`, footer: null, title: null, buttonText: 'Click Here!', sections: [{ title: 'Anoboy', rows: arr }] }, { quoted: m })
	await apivisit
	// By Chandra XD
	// Follow bang
	// TikTok : @pnggilajacn
	// Github : https://github.com/Chandra-XD
	}
handler.help = ['anoboylatest']
handler.tags = ['tools']
handler.command = /^(anoboylatest)$/i
export default handler