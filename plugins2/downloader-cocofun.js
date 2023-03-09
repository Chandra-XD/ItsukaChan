import axios from 'axios'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw m.reply('Putting *URL* Cocofun...')
    if (!args[0].includes("cocofun")) return m.reply(`_Invalid Url..._`)
    let res = (await axios.get(API('can', '/api/download/cocofun', { url: args[0] } ))).data;
    if (res.status != 200) throw res.message;
    if (!res) throw res.message;
	await m.reply('Sedang diproses...')
    await conn.sendMessage(m.chat, { video: { url: res?.result?.no_watermark }, caption: res?.result?.caption}, { quoted: m })
    await apivisit
	// By Chandra XD
	// Follow bang
	// TikTok : @pnggilajacn
	// Github : https://github.com/Chandra-XD
	}
handler.help = ['cocofun'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(cocofun|cocofundl)$/i
export default handler