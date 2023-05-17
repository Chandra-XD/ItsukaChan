import { apivisit } from './kanghit.js'
import { savefrom } from '@bochilteam/scraper'

let handler = async (m, { conn, args, command }) => {
    if (!args[0]) throw `Input *URL*`
    let res = await savefrom(args[0]).catch(_ => null)
	if (!res) throw 'Error 404 Not Found'
	await m.reply('Sedang diproses...')
	try {
	await conn.sendMessage(m.chat, { video: { url: res?.url?.[0]?.url }, caption: res?.meta?.title || '' }, { quoted: m })
	await apivisit
	} catch (e) {
		console.log(e)
		m.reply(`Terjadi kesalahan.`)
	}
}
handler.help = ['instagram'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.alias = ['ig', 'igdl', 'instagram', 'instagramdl']
handler.command = /^(ig(dl)?|instagram(dl)?)$/i
export default handler