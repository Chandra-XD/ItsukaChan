import axios from 'axios'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw `Judul anime?\nContoh : anime date a live`
    let res = (await axios.get(API('can', '/api/anime/otakudesu/search', { query: args[0] } ))).data;
    if (res.status != 200) throw res.message;
    if (!res) throw res.message;
    let v = res.result
	let arr = []
	for (let x of v) arr.push({ title: x.title, rowId: `#otakuinfo ${x.link}` })
	await conn.sendMessage(m.chat, { text: `Result from : ${args[0]}`, footer: null, title: null, buttonText: 'Click Here!', sections: [{ title: 'Otakudesu', rows: arr }] }, { quoted: m })
	await apivisit
	// By Chandra XD
	// Follow bang
	// TikTok : @pnggilajacn
	// Github : https://github.com/Chandra-XD
	}
handler.help = ['otaku'].map(v => v + ' <anime>')
handler.tags = ['tools']
handler.command = /^(otaku|otakudesu)$/i
export default handler