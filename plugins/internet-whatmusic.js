import { TMP } from '../lib/tempfile.js';
import fetch from 'node-fetch'

let handler = async (m) => {
	let q = m.quoted ? m.quoted : m
	let mime = q.mediaType || ''
	if (/video|audio/.test(mime)) {
  try {
	let media = await q.download()
	let data = await TMP(media)
	let res = await fetch(`https://api.audd.io/?url=${data}&return=apple_music&api_token=${global.audd}`)
    let json = await res.json()
    let x = json.result
    return m.reply(`*Lagu Ditemukan!*\n\n*Judul* : ${x.title}\n*Artist* : ${x.artist}\n*Label* : ${x.label}\n*Album* : ${x.album}\n*Release* : ${x.release_date}\n*Link* : ${x.song_link}`)
  } catch (e) {
    throw "Not found"
  }
	} else throw 'No media found'
}
handler.help = ['whatmusic']
handler.tags = ['internet']
handler.command = /^(whatmusic)$/i
export default handler