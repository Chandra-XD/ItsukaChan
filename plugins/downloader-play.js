import { search } from 'yt-search'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, text, usedPrefix: _p }) => {
  if (!text) throw 'Input Query'
  let vid = await search(text)
  if (!vid) throw 'Video/Audio Tidak Ditemukan'
  let anu = vid.videos[Math.floor(Math.random() * vid.videos.length)]
  let { title, thumbnail, videoId, duration, description, views, ago } = anu
  let url = 'https://youtu.be/' + videoId 
  let capt = `*Title:* ${title}\n*Published:* ${ago}\n*Duration:* ${duration}\n*Views:* ${views}\n*Description:* ${description}\n*Url:* ${url}`
  if (m.isGroup) return await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: capt, footer: '_Please select the button below_', buttons: [{ buttonText: { displayText: 'Audio' }, buttonId:  `${_p}yta ${url}` }, { buttonText: { displayText: 'Video' }, buttonId:  `${_p}ytv ${url}` }] }, { quoted: m })
let sections = [{
title: ``,
rows: [
{title: "Lanjutan Pencarian", rowId: `${_p}yts ${text}`},
{title: "Audio / MP3", rowId: `${_p}yta ${url}`},
{title: "Video / MP4", rowId: `${_p}ytv ${url}`}
]}]
await conn.sendMessage(m.chat, { text: capt, footer: wm, title: null, buttonText: `Click Here!!`, sections }, { quoted: m })
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