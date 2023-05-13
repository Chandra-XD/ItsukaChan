import { search } from 'yt-search'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Input Query'
  let vid = await search(text)
  if (!vid) throw 'Video/Audio Tidak Ditemukan'
  let anu = vid.videos[Math.floor(Math.random() * vid.videos.length)]
  let { title, thumbnail, videoId, duration, description, views, ago } = anu
  let url = 'https://youtu.be/' + videoId 
  let capt = `*Title:* ${title}\n*Published:* ${ago}\n*Duration:* ${duration}\n*Views:* ${views}\n*Description:* ${description}\n*Url:* ${url}`
  await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: capt }, { quoted: m })
  await apivisit
	// By Chandra XD
	// Follow bang
	// TikTok : @pnggilajacn
	// Github : https://github.com/Chandra-XD
}
handler.help = handler.alias = ['play'].map(v => v + ' <query>')
handler.tags = ['downloader']
handler.command = /^(play)$/i
export default handler