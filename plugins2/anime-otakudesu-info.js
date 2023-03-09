import axios from 'axios'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw `Link?`
    if (!args[0].includes("anime")) throw `Invalid Url...`
    let res = (await axios.get(API('can', '/api/anime/otakudesu/info', { link: args[0] } ))).data;
    if (res.status != 200) throw res.message;
    if (!res) throw res.message;
    let v = res.result
	let arr = []
	for (let x of v.episode) arr.push({ title: x._title, rowId: `#otakudl ${x._eps}` })
	await conn.sendMessage(m.chat, { text: `*Title :* ${v.title}\n*Japanese Title :* ${v.japanese_title || '-'}\n*Score :* ${v.score || '-'}\n*Produser :* ${v.producer || '-'}\n*Type :* ${v.type}\n*Status :* ${v.status || '-'}\n*Total Eps :* ${v.total_eps || '-'}\n*Durasi :* ${v.duration || '-'}\n*Release :* ${v.release_date || '-'}\n*Studio :* ${v.studio || '-'}\n*Genre :* ${v.genre}`, footer: null, title: null, buttonText: 'Click Here!', sections: [{ title: 'Otakudesu', rows: arr }] }, { quoted: m })
	await apivisit
	// By Chandra XD
	// Follow bang
	// TikTok : @pnggilajacn
	// Github : https://github.com/Chandra-XD
	}
handler.help = ['otakuinfo'].map(v => v + ' <url>')
handler.tags = ['tools']
handler.command = /^(otakuinfo|otakudesuinfo)$/i
export default handler