/* function handler(m) {
let data = global.owner.filter(([id, isCreator]) => id && isCreator)
this.sendContact(m.chat, data.map(([id, name]) => [id, name]), m)
}
handler.alias = ['owner']
handler.command = /^(owner)$/i
export default handler */

let handler = async (m, { conn, command }) => { 
let ownName = `Chandra XD`
let ownNum = global.owner[0]
let ownUrl = `https://pnggilajacn.my.id`
let ownEmail = `cuancari074@gmail.com`

if (command == 'owner') {
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:WhatsApp;${ownName}\nNICKNAME:${ownName}\nORG:${ownName}\nTITLE:\nitem1.TEL;waid=${ownNum}:+${ownNum}\nitem1.X-ABLabel:Owner\nitem2.URL:${ownUrl}\nitem2.EMAIL;type=INTERNET:${ownEmail}\nitem2.X-ABLabel:\nitem4.ADR:;;Indonesia;;;;\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: ownName, contacts: [{ vcard }] }}, { quoted: m })
}
if (command == 'creator') {
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:WhatsApp;${ownName}\nNICKNAME:${ownName}\nORG:${ownName}\nTITLE:\nitem1.TEL;waid=${ownNum}:+${ownNum}\nitem1.X-ABLabel:Owner\nitem2.URL:${ownUrl}\nitem2.EMAIL;type=INTERNET:${ownEmail}\nitem2.X-ABLabel:\nitem4.ADR:;;Indonesia;;;;\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: ownName, contacts: [{ vcard }] }}, { quoted: m })
}
}
handler.help = ['owner', 'creator']
handler.tags = ['info']
handler.command = /^(creator|owner)$/i
export default handler
