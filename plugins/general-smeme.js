import { TMP } from '../lib/tempfile.js'
import { Sticker } from 'wa-sticker-formatter'

let d = new Date
let date = d.toLocaleDateString('id', { day: 'numeric', month: 'numeric', year: 'numeric' })
let depan = `Created by ItsukaBot-Md\n\nOwner : Chandra 3.07\nPanther collab : Rico2378, Skigem Pack`
let blakng = date

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Input *Text*`
    let [atas, bawah] = text.split`|`
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `Balas gambar dengan perintah\n\n${usedPrefix + command} <${atas ? atas : 'teks atas'}>|<${bawah ? bawah : 'teks bawah'}>`
    if (!/image\/(jpe?g|png)/.test(mime)) throw `_*Mime ${mime} tidak didukung!*_`
    let img = await q.download()
    let link = await TMP(img)
    let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(bawah ? bawah : '')}/${encodeURIComponent(atas ? atas : '')}.png?background=${link}`
    let stiker = await (new Sticker(meme, { type: 'full', pack: depan, author: blakng })).toMessage()
  if (stiker) return conn.sendMessage(m.chat, stiker, { quoted: m })
}
handler.command = /^(smeme|memeg|memegen)$/i
export default handler