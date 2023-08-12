import yts from 'yt-search'
import ytdl from 'ytdl-core'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Input Query'
  let vid = await yts(ytdl.validateURL(text) ? { videoId: await ytdl.getURLVideoID(text) } : { query: text })
	vid = vid.videos ? vid.videos[0] : vid
  if (!vid) throw 'Video/Audio Tidak Ditemukan'
  let { title, description, url, seconds, timestamp, views, ago, image } = vid
  let capt = `*Title:* ${title}\n*Published:* ${ago}\n*Views:* ${views}\n*Description:* ${description}\n*Url:* ${url}`
  conn.sendMessage(m.chat, { react: { text: `⌚`, key: m.key }})
  try {
  let aud = await conn.sendMessage(m.chat, { [seconds > 1900 ? 'document' : 'audio']: { url: `https://popcat.xyz/download?url=`+url+`&filter=audio&filename=temp` }, mimetype: 'audio/mpeg', fileName: `${title}.mp3` }, { quoted: m })
  conn.sendMessage(m.chat, { text: capt }, { quoted: aud })
  await apivisit
  } catch (e) {
		console.log(e)
  let aud = await conn.sendMessage(m.chat, { [seconds > 1900 ? 'document' : 'audio']: { url: `https://popcat.xyz/download?url=`+url+`&filter=audio&filename=temp` }, mimetype: 'audio/mpeg', fileName: `${title}.mp3` }, { quoted: m })
  conn.sendMessage(m.chat, { text: capt }, { quoted: aud })
		// m.reply(`Terjadi kesalahan.`)
	}
	// By Chandra XD
	// Follow bang
	// TikTok : @pnggilajacn
	// Github : https://github.com/Chandra-XD
}
handler.help = handler.alias = ['play'].map(v => v + ' <query>')
handler.tags = ['downloader']
handler.command = /^(play)$/i
export default handler