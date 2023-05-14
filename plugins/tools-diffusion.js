import fetch from "node-fetch"
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Input Query\nExample : ${usedPrefix + command} 1girl, blush, looking to viewer, warm smile`
    let randomS = randomId()
    let res = await fetch(global.API('can', '/api/maker/diffusion', { text: encodeURIComponent(m.text), seed: randomS }, 'apikey'))
    let json = await res.json()
    if(!json.base64Img) throw `Server Error 404`
    let buffer = Buffer.from(json.base64Img, "base64");
    try {
    await conn.sendFile(m.chat, buffer, ``, `Request from : `+ text, m)
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
handler.help = ['diffusion'].map(v => v + ' <query>')
handler.tags = ['tools']
handler.command = /^(diffusion|ai-image)$/i
export default handler

function randomId() {
	return Math.floor(100000000 + Math.random() * 100000000);
}