import axios from 'axios'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw `Judul?`
    let res = (await axios.get(API('can', '/api/anime/nekopoi/search', { query: args[0] } ))).data;
    if (res.status != 200) throw res.message;
    if (!res) throw res.message;
	let arr = []
	for (let x of res) arr.push({ title: x.title, description: `Upload : ${x.date || 'unknown'} || Id : ${x.id}`, rowId: `#nekoinfo ${x.id}` })
	await conn.sendMessage(m.chat, { text: `Result from : ${args[0]}`, footer: null, title: null, buttonText: 'Click Here!', sections: [{ title: 'Nekopoi', rows: arr }] }, { quoted: m })
	await apivisit
	// By Chandra XD
	// Follow bang
	// TikTok : @pnggilajacn
	// Github : https://github.com/Chandra-XD
	}
handler.help = ['nekopoi'].map(v => v + ' <query>')
handler.tags = ['tools']
handler.command = /^(nekopoi)$/i
export default handler