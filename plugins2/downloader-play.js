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
// await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: capt, footer: '_Please select the button below_', buttons: [{ buttonText: { displayText: 'Audio' }, buttonId:  `.yta ${url}` }, { buttonText: { displayText: 'Video' }, buttonId:  `.ytv ${url}` }] }, { quoted: m })
  let templateButtons = [
    {index: 1, urlButton: {displayText: 'Go To YouTube', url: `${url}` }},
    {index: 2, quickReplyButton: {displayText: 'Audio', id: `.yta ${url}`}},
    {index: 3, quickReplyButton: {displayText: 'Video', id: `.ytv ${url}`}},
]
  await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: capt, footer: 'Please select the button below..', templateButtons: templateButtons }, { quoted: m, ephemeralExpiration: global.ephemeral, forwardingScore: 99999, isForwarded: true })
  await apivisit
}
handler.help = handler.alias = ['play'].map(v => v + ' <query>')
handler.tags = ['downloader']
handler.command = /^(play)$/i
export default handler