import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {
   if (!args[0]) throw 'Nothing url'
   if (!/^https?:\/\//.test(args[0])) throw 'Param *URL* must be starts with http:// or https://'
   try {
   let url = API('can', '/api/other/ssweb', { link: args[0] })
   conn.sendMessage(m.chat, { image: { url }, caption: `${args[0]}` }, { quoted: m })
   } catch (e) {
		console.log(e)
		m.reply(`Maaf erjadi kesalahan.`)
	}
}
handler.help = ['ssweb']
handler.tags = ['internet']
handler.command = /^ss(web)?f?$/i
export default handler