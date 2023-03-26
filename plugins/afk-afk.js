let handler = async (m, { text }) => {
  let user = global.db.data.users[m.sender]
  user.afk = + new Date
  user.afkReason = text
  m.reply(`${conn.getName(m.sender)} sekarang telah AFK dengan alasan ${text ? ': ' + text : ''}`)
}
handler.help = ['afk'].map(v => v + ' <alasan>')
handler.tags = ['main']
handler.command = /^afk$/i
export default handler
