export default function handler(m) {
	m.reply(clockString(process.uptime()))
}
handler.help = ['runtime']
handler.tags = ['info']
handler.command = /^(up|run)time$/i

function clockString(ms) {
	let h = isNaN(ms) ? '--' : Math.floor(ms % (3600 * 24) / 3600)
	let m = isNaN(ms) ? '--' : Math.floor(ms % 3600 / 60)
	let s = isNaN(ms) ? '--' : Math.floor(ms % 60)
	return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
