let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i

let handler = async (m, { conn, text, isOwner }) => {
    let [_, code] = text.match(linkRegex) || []
    if (!code) throw 'Link invalid'
    if (!isOwner) {
       m.reply('Link grup telah dikirimkan ke owner!\nHarap menunggu acc dari owner...')
       for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
        let data = (await conn.onWhatsApp(jid))[0] || {}
        // conn.copyNForward(data.jid, m, true)
        conn.sendButton(data.jid, `@${m.sender.split('@')[0]} Ingin menambahkan Botmu ke ${text}\nTerima/Tolak?`, 'Join Acc', null, [['Terima', `.join ${text}`], ['Tolak', '.']], m, { mentions: [m.sender] })
      }
       return
    }
    let res = await conn.groupAcceptInvite(code)
    if (!res) throw res.toString()
    let name = await conn.getName(res).catch(_ => null)
    // expired =  Math.floor(Math.min(999, Math.max(1, isOwner ? expired && expired.isNumber() ? parseInt(expired) : 0 : 3)))
    m.reply(`Berhasil join grup ${name || res}`)/*${expired ? `selama ${expired} hari` : ''}`)
    
    let chats = global.db.data.chats[res]
    if (!chats) chats = global.db.data.chats[res] = {}
    if (expired) chats.expired = +new Date() + expired * 1000 * 60 * 60 * 24
    */
}
handler.command = /^join$/i
// handler.rowner = true
export default handler