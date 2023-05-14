import axios from 'axios'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, text, usedPrefix: _p }) => {
    if (!text) throw `Link?`
    if (!text.includes("anime")) throw `Invalid Url...`
    let res = (await axios.get(API('can', '/api/anime/otakudesu/info', { link: text } ))).data;
    let vs = res.result
	let arr = []
	let tekss = vs.episode.map(v => { return `${v._title}\n${v._eps}`}).filter(v => v).join('\n\n')
	// for (let x of vs.episode) arr.push({ title: x._title, rowId: `${_p}otakudl ${x._eps}` })
	try {
	await m.reply(`*Title :* ${vs.title}\n*Japanese Title :* ${vs.japanese_title || '-'}\n*Score :* ${vs.score || '-'}\n*Produser :* ${vs.producer || '-'}\n*Type :* ${vs.type}\n*Status :* ${vs.status || '-'}\n*Total Eps :* ${vs.total_eps || '-'}\n*Durasi :* ${vs.duration || '-'}\n*Release :* ${vs.release_date || '-'}\n*Studio :* ${vs.studio || '-'}\n*Genre :* ${vs.genre}\n\n${tekss}`)
	// await conn.sendMessage(m.chat, { text: `*Title :* ${vs.title}\n*Japanese Title :* ${vs.japanese_title || '-'}\n*Score :* ${vs.score || '-'}\n*Produser :* ${vs.producer || '-'}\n*Type :* ${vs.type}\n*Status :* ${vs.status || '-'}\n*Total Eps :* ${vs.total_eps || '-'}\n*Durasi :* ${vs.duration || '-'}\n*Release :* ${vs.release_date || '-'}\n*Studio :* ${vs.studio || '-'}\n*Genre :* ${vs.genre}`, footer: null, title: null, buttonText: 'Click Here!', sections: [{ title: 'Otakudesu', rows: arr }] }, { quoted: m })
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
handler.help = ['otakuinfo'].map(v => v + ' <url>')
handler.tags = ['tools']
handler.command = /^(otakuinfo|otakudesuinfo)$/i
export default handler