import { youtubedl } from '../lib/y2mate.js'

let handler = async (m, { conn, args }) => {
  if (/^https?:\/\/.*youtu/i.test(args[0])) {
    conn.sendMessage(m.chat, { react: { text: `🕑`, key: m.key }})
  const data = await youtubedl(args[0]) 
  const dl = await data.resultUrl.audio[0].download() 
  const ttl = await data.result.title
  
  await conn.sendMessage(m.chat, { [/^(?:-|--)doc$/i.test(args[1]) ? 'document' : 'audio']: { url: dl }, fileName: `${ttl}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m })
} else throw "Invalid URL"
}

handler.help = ['mp3'].map(v => 'yt' + v + ` <url>`)
handler.tags = ['downloader']
handler.command = /^yt(a|mp3)$/i
export default handler