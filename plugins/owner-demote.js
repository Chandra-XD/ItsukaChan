import { areJidsSameUser } from '@whiskeysockets/baileys'
let handler = async (m, { conn, participants }) => {
let users = m.mentionedJid.filter(u => !areJidsSameUser(u, conn.user.id))
let user = m.mentionedJid && m.mentionedJid[0]
await conn.groupParticipantsUpdate(m.chat, [user], 'demote')
m.reply('Succes')
}
handler.help = ['odemote']
handler.tags = ['owner']
handler.command = /^(odemote)$/i
handler.owner = true
handler.group = true
handler.botAdmin = true
export default handler