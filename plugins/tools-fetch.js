import fetch from 'node-fetch'
import { format } from 'util'
import { apivisit } from './kanghit.js'

let handler = async (m, { text }) => {
	if (!/^https?:\/\//.test(text)) throw 'Param *URL* must be starts with http:// or https://'
	let { href: url, origin } = new URL(text)
	let res = await fetch(url, { headers: { 'referer': origin }})
	if (res.headers.get('content-length') > 100 * 1024 * 1024 * 1024) throw `Content-Length: ${res.headers.get('content-length')}`
	if (!/text|json/.test(res.headers.get('content-type'))) return conn.sendFile(m.chat, url, 'file', text, m)
	let txt = await res.buffer()
	try {
		txt = format(JSON.parse(txt + ''))
	} catch (e) {
		txt = txt + ''
	} finally {
		m.reply(txt.slice(0, 65536) + '')
	}
	await apivisit
}
handler.help = ['fetch']
handler.tags = ['tools']
handler.alias = ['get', 'fetch']
handler.command = /^(fetch|get)$/i
handler.owner = true
export default handler