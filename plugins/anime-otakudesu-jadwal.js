import fetch from 'node-fetch'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn }) => {
    let res = await fetch(global.API('can', '/api/anime/otakudesu/jadwal'));
    let json = await res.json()
    let teks = ""
     for (const obj of json["scheduleList"]) {
         teks += `Hari: ${obj.day}\n`
         for (const _obj of obj.animeList) {
             teks += `- ${_obj.anime_name}\n`
         }
         teks += "\n\n"
     }
    try {
    await conn.sendMessage(m.chat, { text: teks }, { quoted: m})
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
handler.help = ['scheduleotaku']
handler.tags = ['tools']
handler.command = /^(scheduleotaku|otakudesuschedule)$/i
export default handler