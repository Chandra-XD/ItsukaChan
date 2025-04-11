import yts from 'yt-search'
import ytdl from 'ytdl-core'

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Input Query'
conn.sendMessage(m.chat, { react: { text: `🕑`, key: m.key }})
  let vid = await yts(ytdl.validateURL(text) ? { videoId: await ytdl.getURLVideoID(text) } : { query: text })
	vid = vid.videos ? vid.videos[0] : vid
  if (!vid) throw 'Video/Audio Tidak Ditemukan'

  let { title, description, url, seconds, timestamp, views, ago, thumbnail } = vid
  		
  let capt = `*Title:* ${title}\n*Published:* ${ago}\n*Views:* ${views}\n*Description:* ${description}\n*Url:* ${url}`
  
  let api = (await axios.get("https://ochinpo-helper.hf.space/yt?query="+ url)).data 
  let x1 = api.result
  
  let ytthumb = await (await conn.getFile(thumbnail)).data
  let repl = await conn.reply(m.chat, capt, m, { contextInfo: { externalAdReply :{ mediaUrl: url, mediaType: 1, description: null, title: title, body: description, renderLargerThumbnail: true, thumbnail: ytthumb, sourceUrl: url }}})
  
  await conn.sendMessage(m.chat, { [seconds > 1900 ? 'document' : 'audio']: { url: x1.download.audio }, mimetype: 'audio/mpeg', fileName: `${title}.mp3` }, { quoted: repl })
	// By Chandra XD
	// Follow bang
	// TikTok : @pnggilajacn
	// Github : https://github.com/Chandra-XD
}
handler.help = handler.alias = ['play'].map(v => v + ' <query>')
handler.tags = ['downloader']
handler.command = /^(play)$/i
export default handler