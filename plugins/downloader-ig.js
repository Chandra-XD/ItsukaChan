import { apivisit } from './kanghit.js'
import { facebookdlv2, savefrom } from '@bochilteam/scraper'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Input *URL*`
    if (!args[0].match(/https:\/\/www.instagram.com\/(p|reel|tv)/gi)) throw `*Link salah! Perintah ini untuk mengunduh postingan ig/reel/tv, bukan untuk highlight/story!*\n\nContoh:\n${usedPrefix + command} https://www.instagram.com/p/BmjK1KOD_UG/?utm_source=ig_web_copy_link`
    let res = await savefrom(args[0]).catch(async _ => await facebookdlv2(args[0])).catch(_ => null)
	if (!res) throw 'Error 404 Not Found'
	await m.reply('Sedang diproses...')
	let isHD = (res?.result?.length > 1 || res?.hd?.url) && !/^(?:-|--)hd$/i.test(args[1])
//	if (isHD) return conn.sendButton(m.chat, res?.description || res?.meta?.title || ' ', wm, res?.result?.[1]?.url || res?.sd?.url, [['HD Quality', `${usedPrefix + command} ${args[0]} --hd`]], m)
  	if (isHD) return conn.sendMessage(m.chat, { video: { url: res?.result?.[1]?.url || res?.sd?.url }, caption: res?.description || res?.meta?.title || ' '}, { quoted: m })
	else await conn.sendMessage(m.chat, { video: { url: res?.result?.[0]?.url || res?.hd?.url || res?.url?.[0]?.url }, caption: res?.description || res?.meta?.title || '' }, { quoted: m })
	await apivisit
}
handler.help = ['instagram'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.alias = ['ig', 'igdl', 'instagram', 'instagramdl']
handler.command = /^(ig(dl)?|instagram(dl)?)$/i
export default handler
