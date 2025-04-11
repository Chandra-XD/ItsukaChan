import { Telesticker } from 'xfarr-api'
import { stickerTelegram } from '@bochilteam/scraper'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, args }) => {
    try {
	if (args[0] && args[0].match(/(https:\/\/t.me\/addstickers\/)/gi)) {
		let res = await Telesticker(args[0])
		await m.reply(`Sending ${res.length} stickers...`)
		if (m.isGroup && res.length > 30) {
			await m.reply('Number of stickers more than 30, bot will send it in private chat.')
			for (let i = 0; i < res.length; i++) {
				conn.sendMessage(m.sender, { sticker: { url: res[i].url }})
			}
		} else {
			for (let i = 0; i < res.length; i++) {
				conn.sendMessage(m.chat, { sticker: { url: res[i].url }})
			}
		}
		await apivisit
	} else if (args && args.join(' ')) {
		let [query, page] = args.join(' ').split('|')
		let res = await stickerTelegram(query, page)
		if (!res.length) throw `Query "${args.join(' ')}" not found`
		m.reply(res.map(v => `*${v.title}*\n_${v.link}_`).join('\n\n'))
		await apivisit
	} else throw 'Input Query / Telesticker Url'
} catch (e) {
throw `Error`
}
}
handler.help = ['telesticker'].map(v => v + ' <query / url>')
handler.tags = ['downloader']
handler.command = /^(telestic?ker|stic?kertele)$/i
export default handler