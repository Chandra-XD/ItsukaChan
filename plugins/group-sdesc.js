let handler = async (m, { text }) => {
if(!text) throw 'Text?'
await conn.groupUpdateDescription(m.chat, text)
return m.reply("Done.")
}

handler.help = ['setdesc'].map(v => v + ' <text>')
handler.tags = ['group']
handler.command = /^(setdesc|sdesc)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler