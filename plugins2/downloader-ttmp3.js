let fetch = require('node-fetch')
let handler = async (m, { conn, args }) => {
  if (!args[0]) throw 'Uhm...url nya mana?'
  let res = await fetch(`https://api.akuari.my.id/downloader/tiktok3?link=${args[0]}`)
  let json = await res.json()
  m.reply('Sedang diproses...')
  conn.sendMessage(m.chat, { audio: { url: `${json.hasil.download_mp3}`}, mimetype: 'audio/mpeg' }, { quoted: m })
}
handler.help = ['ttmp3'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(ttmp3|tiktokmp3)$/i
export default handler