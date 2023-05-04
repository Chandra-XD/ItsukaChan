import { facebookdlv2, savefrom } from '@bochilteam/scraper'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, args, usedPrefix: _p, command: cmd }) => {
	if (!args[0]) throw 'Input URL'
	let res = await savefrom(args[0]).catch(async _ => await facebookdlv2(args[0])).catch(_ => null)
	if (!res) throw 'Error 404 Not Found'
	await m.reply('Sedang diproses...')
	let isHD = (res?.result?.length > 1 || res?.hd?.url) && !/^(?:-|--)hd$/i.test(args[1])
//	if (isHD) return conn.sendButton(m.chat, res?.description || res?.meta?.title || ' ', wm, res?.result?.[1]?.url || res?.sd?.url, [['HD Quality', `${_p + cmd} ${args[0]} --hd`]], m)
  	if (isHD) return conn.sendMessage(m.chat, { video: { url: res?.result?.[1]?.url || res?.sd?.url }, caption: res?.description || res?.meta?.title || ' '}, { quoted: m })
	else await conn.sendMessage(m.chat, { video: { url: res?.result?.[0]?.url || res?.hd?.url || res?.url?.[0]?.url }, caption: res?.description || res?.meta?.title || '' }, { quoted: m })
	await apivisit
}
handler.help = handler.alias = ['facebook'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^((facebook|fb)(dl)?)$/i
export default handler
