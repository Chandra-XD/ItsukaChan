import Booru from 'booru'
let sites = ['sb', 'kn', 'kc']

let handler = async (m, { conn, usedPrefix, command }) => {
	let res = await Booru.search(sites.getRandom(), ['loli'], { random: true })
	let url = res[0].fileUrl
	conn.sendMessage(m.chat, { image: { url }, caption: 'Random Image Loli'}, { quoted: m})
}
handler.help = ['loli']
handler.tags = ['weebs']
handler.command = /^(loli)$/i
export default handler