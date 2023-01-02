import fetch from 'node-fetch'
import { search } from 'yt-search'

let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text) throw 'Input Query'
  let vid = (await search(text)).videos[0]
  if (!vid) throw 'Video/Audio Tidak Ditemukan'
  let { title, thumbnail, videoId, duration, views, ago } = vid
  let url = 'https://www.youtube.com/watch?v=' + videoId
  let ytLink = `https://yt-downloader.akkun3704.repl.co/?url=${url}&filter=audioonly&quality=highestaudio&contenttype=audio/mpeg`
  let capt = `*Title:* ${title}\n*Published:* ${ago}\n*Duration:* ${duration}\n*Views:* ${views}\n*Url:* ${url}`
  let buttons = [{ buttonText: { displayText: 'Video' }, buttonId:  `.ytv ${url}` }]
  let msg = await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: capt, footer: '_Audio on progress..._', buttons }, { quoted: m })
  conn.sendMessage(m.chat, { audio: { url: ytLink }, mimetype: 'audio/mpeg' }, { quoted: msg })
}
handler.help = handler.alias = ['play'].map(v => v + ' <query / url>')
handler.tags = ['downloader']
handler.command = /^(play)$/i

export default handler