import cp, { exec as _exec } from 'child_process'
import { promisify } from 'util'
let exec = promisify(_exec).bind(cp)

let handler = async (m, { conn }) => {
	await m.reply('_Testing speed..._')
	let o
	try {
		o = await exec('speedtest --accept-license')
	} catch (e) {
		o = e
	} finally {
		if (o.stdout) conn.reply(m.chat, o.stdout.trim(), m) // conn.sendFile(m.chat, o.stdout.split('Result URL: ')[1], '', o.stdout.trim(), m)
		else if (o.stderr) m.reply(o.stderr)
	}
}
handler.command = /^ping|speed?$/i
export default handler