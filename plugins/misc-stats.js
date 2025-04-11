import fs from 'fs'
import os from 'os'
import { sizeFormatter } from 'human-readable'
import { apivisit } from './kanghit.js'

let formatSize = sizeFormatter({
	std: 'JEDEC',
	decimalPlaces: '2',
	keepTrailingZeroes: false,
	render: (literal, symbol) => `${literal} ${symbol}B`
})

let handler = async (m, { conn }) => {
	let chats = Object.entries(conn.chats).filter(([a, b]) => a && b.isChats),
		groups = chats.filter(([a]) => a.endsWith('@g.us')),
		session = fs.statSync(global.authFile),
		txt = `
*BOT:*
- ${groups.length} Group Chats
- ${chats.length - groups.length} Personal Chats
- ${chats.length} Total Chats

*SERVER:*
- Platform: ${process.platform}
- Nodejs: ${process.version}
- Session Size: ${formatSize(session.size)}
- Memory: ${formatSize(os.totalmem() - os.freemem())} / ${formatSize(os.totalmem())}
`
	await m.reply(txt.trim())
	await apivisit
}
handler.alias = ['stats']
handler.command = /^(stats)$/i
export default handler