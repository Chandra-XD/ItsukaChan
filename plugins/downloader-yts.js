import yts from 'yt-search'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, text, usedPrefix: _p }) => {
	if (!text) throw 'Query??'
  let results = await yts(text)
  let tes = results.all
  let teks = results.all.map(v => {
  switch (v.type) {
  case 'video': return `*_${v.title}_*\n_${v.url}_\n_Uploaded ${v.ago}, ${parseInt(v.views).toLocaleString()} views_`}}).filter(v => v).join('\n\n')
  conn.sendFile(m.chat, tes[0].thumbnail, 'yts.jpeg', teks, m)
  await apivisit
}
handler.help = ['earch'].map(v => 'yts' + v + ' <query>')
handler.tags = ['downloader']
handler.command = /^yts(earch)?$/i
export default handler