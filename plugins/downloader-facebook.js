import { savefrom } from '@bochilteam/scraper'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, args, command }) => {
	if (!args[0]) throw 'Input URL'
	let res = await savefrom(args[0]).catch(_ => null)
	if (!res) throw 'Error 404 Not Found'
	await m.reply('Sedang diproses...')
	try {
  	await conn.sendMessage(m.chat, { video: { url: res?.hd?.url || res?.url?.[0]?.url || res?.sd?.url }, caption: res?.meta?.title || ' '}, { quoted: m })
	await apivisit
	} catch (e) {
		console.log(e)
		m.reply(`Terjadi kesalahan.`)
	}
}
handler.help = handler.alias = ['facebook'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^((facebook|fb)(dl)?)$/i
export default handler