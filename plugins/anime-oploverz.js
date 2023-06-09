import axios from 'axios'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw `Judul anime?\nContoh : date a live`
    let res = (await axios.get(API('skizo', '/api/oploverz', { search: args[0] }, 'apikey' ))).data;
	try {
	let tekss = res.list_episode.map(v => { return `${v.title}\n${v.url}`}).filter(v => v).join('\n\n')
	await m.reply(`*Title :* ${res.title}\n\n*Description :* ${res.description}\n\n${tekss}`)
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
handler.help = ['oploverz'].map(v => v + ' <anime>')
handler.tags = ['tools']
handler.command = /^(oploverz|oplo)$/i
export default handler