import axios from 'axios'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, args }) => {
    let page = args[0] || `1`
    let res = (await axios.get(API('can', '/api/anime/otakudesu/latest', { page: page } ))).data;
    if (res.status != 200) throw res.message;
    if (!res) throw res.message;
    let v = res.animeList
	let arr = []
	for (let x of v) arr.push({ title: x.title, description: `${x.episode}, ${x.uploaded_on} Hari Update ${x.day_updated}`, rowId: `#otakuinfo ${x.link}` })
	await conn.sendMessage(m.chat, { text: `Otakudesu Latest`, footer: null, title: null, buttonText: 'Click Here!', sections: [{ title: 'Otakudesu', rows: arr }] }, { quoted: m })
	await apivisit
	// By Chandra XD
	// Follow bang
	// TikTok : @pnggilajacn
	// Github : https://github.com/Chandra-XD
	}
handler.help = ['otakulatest']
handler.tags = ['tools']
handler.command = /^(otakulatest|otakudesulatest)$/i
export default handler