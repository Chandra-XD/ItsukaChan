import axios from 'axios'
import { lookup } from "mime-types"
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw m.reply('Putting *URL* Krakenfiles...')
    if (!args[0].includes("krakenfiles")) return m.reply(`_Invalid Url..._`)
    let res = (await axios.get(API('skizo', '/api/krakendl', { url: args[0] }, 'apikey' ))).data;
    let mimetype = await lookup(res.type)
	await conn.sendMessage(m.chat, { react: { text: `🕑`, key: m.key }})
    await conn.sendMessage(m.chat, { document: { url: res.url }, fileName: res.file_name, mimetype, caption: `*File Name :* ${res.file_name}\n*UploadDate :* ${res.upload_date}\n*File Size :* ${res.file_size}\n*views :* ${res.views}\n*Total Download :* ${res.downloads}`}, { quoted: m})
    await apivisit
	// By Chandra XD
	// Follow bang
	// TikTok : @pnggilajacn
	// Github : https://github.com/Chandra-XD
	}
handler.help = ['kraken'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(kraken|krakenfiles|krakendl)$/i
export default handler