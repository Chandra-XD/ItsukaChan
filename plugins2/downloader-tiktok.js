import fetch from 'node-fetch'
let handler = async (m, { conn, args }) => {
  try {
  if (!args[0]) throw 'Uhm...url nya mana?'
   let res = await fetch(`https://malesin.xyz/tiktok?url=${args[0]}&apikey=${global.malesin}`)
   let json = await res.json()
   m.reply('Sedang diproses...')
  await conn.sendFile(m.chat, json.video, 'tiktok.mp4', `${json.title}`, m )
  } catch {
  if (!args[0]) throw 'Uhm...url nya mana?'
  let res2 = await fetch(API('lol', '/api/tiktok', { url: args[0] }, 'apikey'))
  let json2 = await res2.json()
  m.reply('Sedang diproses...')
  await conn.sendFile(m.chat, json2.result.link, 'tiktok.mp4', wm, m )
  }
}
handler.help = ['tiktok'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(tt|tik(tok)?(dl)?)$/i
export default handler