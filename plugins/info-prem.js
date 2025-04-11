let handler = m => m

export async function all(m) {
    let user = global.db.data.users[m.sender]
    if (m.chat.endsWith('broadcast')) return
    if (user.premiumDate != 0 && user.premium) {
        if (new Date() * 1 >= user.premiumDate) {
        conn.reply(m.chat, "*Maaf waktu premium kamu telah berakhir*\n*Chat owner untuk upgrade ke premium lagi*", m).then(() => {
        user.premiumDate = 0
        user.premium = false
        let ownName = `Chandra XD`
        let ownNum = global.owner[0]
        let ownUrl = `https://pnggilajacn.my.id`
        let ownEmail = `cuancari074@gmail.com`
        let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:WhatsApp;${ownName}\nORG:${ownName}\nTITLE:\nitem1.TEL;waid=${ownNum}:+${ownNum}\nitem1.X-ABLabel:Not a bot and don\'t save\nitem2.URL:${ownUrl}\nitem2.EMAIL;type=INTERNET:${ownEmail}\nitem2.X-ABLabel:\nitem4.ADR:;;Indonesia;;;;\nEND:VCARD`
        conn.sendMessage(m.chat, { contacts: { displayName: ownName, contacts: [{ vcard }] }}, { quoted: m })
        })
        }
    }
}