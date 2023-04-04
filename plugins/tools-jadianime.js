import { h5tuqq } from "@xct007/frieren-scraper"
import upload from '../lib/uploadImage.js'
var handler = async(m, {conn, usedPrefix, command}) => {
    let quoted = m.quoted ? m.quoted : m
    let mime = (quoted.msg || quoted).mimetype || ''
    if (!mime) throw `Kirim foto yang ingin diubah menjadi Animehhh dengan caption *${usedPrefix + command}* atau Balas Fotonya`    
    let media = await quoted.download()
    if (/image/.test(mime)) {
       // await m.react(global.wait)
      await m.reply('_Mohon Tunggu Sebentar..._')
      try {
      let anu = await upload(media)
      let res = await h5tuqq(anu)
      if(res.error) {
       // await m.react(global.fail)
      if(res.message == 'Server mark as busy') return m.reply(`Internal Server Error!`) 
      else if(res.message == 'Image detected as illegal') return m.reply(`Foto Itu Terdeteksi 4No Oleh Sistem!`) 
      else if (res.message == 'Face not detected on image') return m.reply("Wajah Tidak Terdeteksi!")
      else return m.reply('Error! Coba Foto Lain!') 
      }
      await conn.sendFile(m.chat, res.image, '', "Nihh Kak Dah Jadi :')",m)
      //await m.react(global.sukses)
      } catch (e) {
        console.log(e)
      throw `Error!`
      }
      } else return m.reply("Kirim/Balas fotonya!")
}
handler.help = ['jadianime']
handler.tags = ['tools']
handler.command = ['jadianime']

export default handler
