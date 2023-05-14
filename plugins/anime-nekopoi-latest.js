import axios from "axios"
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, usedPrefix: _p }) => {
    let res = (await axios.get(API('can', '/api/anime/nekopoi/latest'))).data;
	let arr = []
	let tekss = res.map(v => { return `${v.title}\nUpload : ${v.date || 'unknown'} || Id : ${v.id}`}).filter(v => v).join('\n\n')
	// for (let x of res) arr.push({ title: x.title, description: `Upload : ${x.date || 'unknown'} || Id : ${x.id}`, rowId: `${_p}nekoinfo ${x.id}` })
	try {
	await m.reply(tekss)
	// await conn.sendMessage(m.chat, { text: `Nekopoi Latest`, footer: null, title: null, buttonText: 'Click Here!', sections: [{ title: 'Nekopoi', rows: arr }] }, { quoted: m })
	await apivisit
	} catch (e) {
		console.log(e)
		m.reply(`Terjadi kesalahan atau server sedang mengalami gangguan.`)
	}
	// By Chandra XD
	// Follow bang
	// TikTok : @pnggilajacn
	// Github : https://github.com/Chandra-XD
	}
handler.help = ['nekopoilatest']
handler.tags = ['tools']
handler.command = /^(nekopoilatest|nekolatest)$/i
export default handler