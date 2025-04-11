let handler = async (m, { conn }) => {
	if (m.quoted?.chat != 'status@broadcast') throw `Quote Pesan Status`
	try {
		let buffer = await m.quoted.download()
		await conn.sendFile(m.chat, buffer, '', m.quoted.text || '', null, false, { quoted: m })
	} catch (e) {
		console.log(e)
		await conn.reply(m.chat, m.quoted.text, m)
	}
}

handler.help = ['swdl']
handler.tags = ['owner']
handler.command = /^((sw|status)(dl|download)|(dl|download)(sw|status))$/i
handler.owner = true
export default handler