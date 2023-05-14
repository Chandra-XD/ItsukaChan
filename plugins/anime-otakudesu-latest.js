import fetch from 'node-fetch'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, args, usedPrefix: _p }) => {
    let page = args[0] || `1`
    let api = await fetch(global.API('can', '/api/anime/otakudesu/latest', { page: page }))
    let res = await api.json()
    let vs = res.animeList
	let arr = []
	let tekss = res.animeList.map(v => { return `${v.title}\n${v.episode || '-'}, ${v.uploaded_on || '-'} Hari Update ${v.day_updated || '-'}\n${v.link}`}).filter(v => v).join('\n\n')
	// for (let x of vs) arr.push({ title: x.title, description: `${x.episode}, ${x.uploaded_on} Hari Update ${x.day_updated}`, rowId: `${_p}otakuinfo ${x.link}` })
	try {
	await m.reply(tekss)
	// await conn.sendMessage(m.chat, { text: `Otakudesu Latest`, footer: null, title: null, buttonText: 'Click Here!', sections: [{ title: 'Otakudesu', rows: arr }] }, { quoted: m })
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
handler.help = ['otakulatest']
handler.tags = ['tools']
handler.command = /^(otakulatest|otakudesulatest)$/i
export default handler