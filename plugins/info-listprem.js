let handler  = async (m, { conn, text, usedPrefix }) => {
	let users = global.db.data.users
	let { registered, name } = global.db.data.users[m.sender]

  var text = ""
  var i = 1
  for (let jid in users){
    if (users[jid].premium){
      text += `\n\n${i}. ${conn.getName(jid)} (@${jid.replace(/@.+/, '')})\n    wa.me/${jid.split('@')[0]}`
      i += 1
    }
  }

  return conn.reply(m.chat,`❏ Total Premium : ${i-1} user\n❏ Upgrade Premium ?\nKetik *${usedPrefix}owner*\n${text}`, false, { contextInfo: { mentionedJid: conn.parseMention(text) }})
}
handler.help = ['listpremium']
handler.tags = ['info']
handler.command = /^(listpremium|premiumlist|listprem|premlist)$/i
export default handler