import { createHash } from 'crypto'
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix }) {
  let user = global.db.data.users[m.sender]
  if (user.registered === true) throw `Kamu sudah terdaftar\nMau daftar ulang? ${usedPrefix}unreg <SN|SERIAL NUMBER>`
  if (!Reg.test(text)) throw `Format salah\n*${usedPrefix}daftar nama.umur*`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw 'Nama tidak boleh kosong'
  if (!age) throw 'Umur tidak boleh kosong'
  age = parseInt(age)
  if (age > 70) throw 'Umur terlalu tua'
  if (age < 6) throw 'Yang bener aja masbro'
  let __waktuh = (new Date - global.db.data.users[m.sender].reglast)
   let _waktuh = (+ 86400000 - __waktuh)
   let waktuh = clockString(_waktuh)
   if (new Date - global.db.data.users[m.sender].reglast > + 86400000) {
   user.reglast = new Date * 1
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let itsuka = Math.floor(Math.random() * 15)
  let expnye = global.db.data.users[m.sender].exp += 1000
  let uang = global.db.data.users[m.sender].money += 1000
  let limitnye = global.db.data.users[m.sender].limit += itsuka
  let chatnye =`Selamat kamu mendapatkan :\n+1000 Exp\n+1000 Money\n+${itsuka} Limit`
  let sn = createHash('md5').update(m.sender).digest('hex')
  m.reply(`Daftar berhasil!

•> Nama: ${name}
•> Umur: ${age} tahun
•> SN: ${sn}

*Jika SN kamu lupa ketik ${usedPrefix}ceksn*

${chatnye}
`.trim())
} else m.reply(`Kamu sudah *daftar*..\nMohon tunggu ${waktuh} untuk bisa *daftar* kembali..`)
}
handler.help = ['daftar']
handler.tags = ['main']
handler.command = /^(daftar|reg(ister)?)$/i
export default handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}