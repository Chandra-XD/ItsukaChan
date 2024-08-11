let handler = async (m, { conn }) => {
    let time = global.db.data.users[m.sender].lastmonthly + 2592000000
  if (new Date - global.db.data.users[m.sender].lastmonthly < 2592000000) throw `Kamu sudah mengklaim bulanan ini\nTunggu selama ${msToTime(time - new Date())} lagi`
        let itsuka = Math.floor(Math.random() * 30)
        global.db.data.users[m.sender].exp += 100000
        global.db.data.users[m.sender].money += 100000
        global.db.data.users[m.sender].limit += itsuka
        conn.reply(m.chat, `Selamat kamu mendapatkan :\n\n+100000 Exp\n+100000 Money\n+${itsuka} Limit`, m)
        global.db.data.users[m.sender].lastmonthly = new Date * 1
    }
handler.help = ['monthly']
handler.tags = ['xp']
handler.command = /^(monthly|bulanan)$/i
handler.register = true
export default handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
  seconds = Math.floor((duration / 1000) % 60),
  minutes = Math.floor((duration / (1000 * 60)) % 60),
  hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
  monthly = Math.floor((duration / (1000 * 60 * 60 * 24)) % 720)
  monthly  = (monthly < 10) ? "0" + monthly : monthly
  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds
  return monthly + " hari " +  hours + " jam " + minutes + " menit"
}