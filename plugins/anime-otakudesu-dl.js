import axios from 'axios'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw `Link?`
    if (!args[0].includes("episode")) throw `Invalid Url...`
    let res = (await axios.get(API('can', '/api/anime/otakudesu/dl', { link: args[0] } ))).data;
    if (res.status != 200) throw res.message;
    if (!res) throw res.message;
    let x = res.result
    await conn.reply(m.chat, `*Title :* ${x.title}\n\n*Download Quality 360p :* ${x.low}\n*Download Quality 480p :* ${x.medium}\n*Download Quality 720p :* ${x.high}`, m)
    await apivisit
	// By Chandra XD
	// Follow bang
	// TikTok : @pnggilajacn
	// Github : https://github.com/Chandra-XD
	}
handler.help = ['otakudl'].map(v => v + ' <id>')
handler.tags = ['downloader']
handler.command = /^(otakudl|otakudesudl)$/i
export default handler