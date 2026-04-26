import axios from 'axios'

let handler = async (m, { conn, args, command }) => {
	if (!args[0]) throw 'Input URL'
	await conn.sendMessage(m.chat, { react: { text: `🕑`, key: m.key }})
	let api = await (await axios.get("https://api.ammaricano.my.id/api/download/facebook?url="+args[0])).data
	let result = api.result
	await conn.sendMessage(m.chat, { video: { url: result.hd || result.sd }}, { quoted: m })
	}
handler.help = handler.alias = ['facebook'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^((facebook|fb)(dl)?)$/i
export default handler