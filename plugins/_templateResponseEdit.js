const {
    proto,
    generateWAMessage,
    areJidsSameUser
} = (await import('@whiskeysockets/baileys')).default

export async function all(m, chatUpdate) {
    if (m.isBaileys) return
    if (!m.message?.editedMessage) return
    let hash = { text: m.message?.editedMessage?.message?.protocolMessage?.editedMessage?.extendedTextMessage?.text || m.message?.editedMessage?.message?.protocolMessage?.editedMessage?.imageMessage?.caption || m.message?.editedMessage?.message?.protocolMessage?.editedMessage?.videoMessage?.caption || m.message?.editedMessage?.message?.protocolMessage?.editedMessage?.documentMessage?.caption || m.message?.editedMessage?.extendedTextMessage?.text || null, mentionedJid: [m.sender] || [] };
    let {
        text,
        mentionedJid
    } = hash
    if (!text) return
    let messages = await generateWAMessage(m.chat, {
        text: text,
        mentions: mentionedJid
    }, {
        userJid: this.user.jid || this.user.id,
        quoted: m.quoted && m.quoted.fakeObj
    })
    messages.key.fromMe = areJidsSameUser(m.sender, this.user.jid || this.user.id)
    messages.key.id = m.key.id
    messages.pushName = m.pushName || m.name
    if (m.isGroup) messages.participant = m.sender
    if (!m.isGroup) messages.participant = m.sender || m.key.remoteJid || m.chat
    let msg = {
        ...chatUpdate,
        messages: [proto.WebMessageInfo.fromObject(messages)],
        type: 'append'
    }
    this.ev.emit('messages.upsert', msg)
}