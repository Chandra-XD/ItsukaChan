let handler = async (m, { conn }) => {
    let time = global.db.data.users[m.sender].lastclaim + 86400000
  if (new Date - global.db.data.users[m.sender].lastclaim < 86400000) throw `Kamu sudah mengklaim harian hari ini\nTunggu selama ${msToTime(time - new Date())} lagi`
        let itsuka = Math.floor(Math.random() * 20)
        global.db.data.users[m.sender].exp += 1000
        global.db.data.users[m.sender].money += 1000
        global.db.data.users[m.sender].limit += itsuka
        conn.reply(m.chat, `Selamat kamu mendapatkan :\n\n+1000 Exp\n+1000 Money\n+${itsuka} Limit`, m)
        global.db.data.users[m.sender].lastclaim = new Date * 1
    } 
handler.help = ['daily']
handler.tags = ['xp']
handler.command = /^(daily|claim|harian)$/i
handler.register = true
export default handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
  seconds = Math.floor((duration / 1000) % 60),
  minutes = Math.floor((duration / (1000 * 60)) % 60),
  hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds
  return hours + " jam " + minutes + " menit " + seconds + " detik"
}