let handler = async (m, { conn, text, usedPrefix, command }) => {
    function no(number){
    return number.replace(/\s/g,'').replace(/([@+-])/g,'')
  }
    var hl = []
  hl[0] = text.split('|')[0]
  hl[0] = no(hl[0]) + "@s.whatsapp.net"
  hl[1] = text.split('|')[1]
  if (!text) return conn.reply(m.chat, `*❏ GET NUMBER*\n\n• ${usedPrefix}prem number|days\n*Example:* ${usedPrefix}prem 628882141495|99\n\n• ${usedPrefix}prem @tag|days\n*Example:* ${usedPrefix}prem @628882141495|99`, m)
  if (typeof db.data.users[hl[0]] == 'undefined') throw 'Pengguna tidak ada didalam data base'
    let user = global.db.data.users[hl[0]]
    var jumlahHari = 86400000 * hl[1]
    var now = new Date() * 1
    if (now < user.premiumDate) user.premiumDate += jumlahHari
    else user.premiumDate = now + jumlahHari
user.premium = true
    m.reply(`✔️ Success
📛 *Name:* ${user.name}
📆 *Days:* ${hl[1]} days
📉 *Countdown:* ${user.premiumDate - now}`)

}
handler.help = ['addprem']
handler.tags = ['owner']
handler.command = /^(add|tambah|\+)p(rem)?$/i
handler.rowner = true
export default handler