import axios from 'axios'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn }) => {
    let res = (await axios.get(API('can', '/api/anime/otakudesu/jadwal'))).data;
    if (res.status != 200) throw res.message;
    if (!res) throw res.message;
    let v = res.scheduleList
    let sections = []
    for(let i of v) {
    for(let z of i.animeList) {
    let list = {
      title: `Update Hari ${i.day}`,
      rows: [{
        title: `${z.anime_name}`,
        rowId: `#otakuinfo ${z.link}`
      }]
    }
    sections.push(list)
  }
}
    await conn.sendMessage(m.chat, {text: "Schedule Otakudesu", buttonText: 'Click Here!', sections}, {quoted: m})
    await apivisit
	// By Chandra XD
	// Follow bang
	// TikTok : @pnggilajacn
	// Github : https://github.com/Chandra-XD
	}
handler.help = ['scheduleotaku']
handler.tags = ['tools']
handler.command = /^(scheduleotaku|otakudesuschedule)$/i
export default handler