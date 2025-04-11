let handler = async (m, { usedPrefix, command, text }) => {
    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false
    let user = global.db.data.users[who]
    if (!who) return m.reply(`Tag or mention someone!\n\nExample:\n${usedPrefix + command} @${m.sender.split`@`[0]}`)
    user.premium = false
    user.premiumDate = 0
    m.reply(`Successfully removed *${user.name}* from premium user`)
}
handler.help = ['delprem']
handler.tags = ['owner']
handler.command = /^(-|del)p(rem)?$/i
handler.rowner = true
export default handler