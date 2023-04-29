import instagramGetUrl from 'fg-ig'
import axios from 'axios'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Input *URL*`
    if (!args[0].match(/https:\/\/www.instagram.com\/(p|reel|tv)/gi)) throw `*Link salah! Perintah ini untuk mengunduh postingan ig/reel/tv, bukan untuk highlight/story!*\n\nContoh:\n${usedPrefix + command} https://www.instagram.com/p/BmjK1KOD_UG/?utm_source=ig_web_copy_link`
    let api = await (await axios.get(`https://sh.xznsenpai.xyz/api/igdl?url=`+args[0])).data
    let results = api.media[0]
//  let results = (await instagramGetUrl(args[0])).url_list[0]
    await m.reply('Sedang diproses...')
    await conn.sendFile(m.chat, results, '', wm, m)
    await apivisit
}
handler.help = ['instagram'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.alias = ['ig', 'igdl', 'instagram', 'instagramdl']
handler.command = /^(ig(dl)?|instagram(dl)?)$/i
export default handler
