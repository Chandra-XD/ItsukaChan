import axios from 'axios'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, args, usedPrefix: _p }) => {
    if (!args[0]) throw `Query?`
    let res = (await axios.get(API('can', '/api/anime/nekopoi/search', { query: args[0] } ))).data;
	let arr = []
	let tekss = res.map(v => { return `${v.title}\nUpload : ${v.date || 'unknown'} || Id : ${v.id}`}).filter(v => v).join('\n\n')
	// for (let x of res) arr.push({ title: x.title, description: `Upload : ${x.date || 'unknown'} || Id : ${x.id}`, rowId: `${_p}nekoinfo ${x.id}` })
	try {
	await m.reply(tekss)
	// await conn.sendMessage(m.chat, { text: `Result from : ${args[0]}`, footer: null, title: null, buttonText: 'Click Here!', sections: [{ title: 'Nekopoi', rows: arr }] }, { quoted: m })
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
handler.help = ['nekopoi'].map(v => v + ' <query>')
handler.tags = ['tools']
handler.command = /^(nekopoi)$/i
export default handler