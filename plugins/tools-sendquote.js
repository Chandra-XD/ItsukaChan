async function handler(m, { isAdmin, isOwner }) {
    if (!m.quoted) throw 'Balas pesannya!'
    let q = this.serializeM(await m.getQuotedObj())
    if (!q.quoted) throw 'Pesan yang kamu balas tidak mengandung balasan!'
    await q.quoted.copyNForward(m.chat, true)
}
//handler.help = ['q']
//handler.tags = ['tools']
handler.command = /^q$/i
export default handler