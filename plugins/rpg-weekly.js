let handler = async (m, { conn }) => {
    let time = global.db.data.users[m.sender].lastweekly + 604800000
  if (new Date - global.db.data.users[m.sender].lastweekly < 604800000) throw `Kamu sudah mengklaim mingguan ini\nTunggu selama ${msToTime(time - new Date())} lagi`
        let itsuka = Math.floor(Math.random() * 30)
        global.db.data.users[m.sender].exp += 10000
        global.db.data.users[m.sender].money += 10000
        global.db.data.users[m.sender].limit += itsuka
        conn.reply(m.chat, `Selamat kamu mendapatkan :\n\n+10000 Exp\n+10000 Money\n+${itsuka} Limit`, m)
        global.db.data.users[m.sender].lastweekly= new Date * 1
    }
    
handler.help = ['weekly']
handler.tags = ['xp']
handler.command = /^(weekly|mingguan)$/i
handler.register = true
export default handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
  seconds = Math.floor((duration / 1000) % 60),
  minutes = Math.floor((duration / (1000 * 60)) % 60),
  hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
  weeks = Math.floor((duration / (1000 * 60 * 60 * 24)) % 168)
  weeks  = (weeks < 10) ? "0" + weeks : weeks
  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds
  return weeks + " hari " +  hours + " jam " + minutes + " menit"
}