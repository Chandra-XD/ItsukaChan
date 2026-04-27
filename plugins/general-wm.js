import webp from 'node-webpmux'

let handler = async (m, { conn, text }) => {
  if (!m.quoted) throw 'Reply a sticker!'
  let stiker = false
  try {
    let [packname, ...author] = text.split('|')
    author = (author || []).join('|')
    let mime = m.quoted.mimetype || ''
    if (!/webp/.test(mime)) throw 'Reply sticker!'
    let img = await m.quoted.download()
    if (!img) throw 'Reply a sticker!'
    stiker = await addExif(img, packname || '', author || '')
  } catch (e) {
    console.error(e)
    if (Buffer.isBuffer(e)) stiker = e
  } finally {
    if (stiker) conn.sendMessage(m.chat, { sticker: stiker }, { quoted: m })
    else throw 'Conversion failed'
  }
}
handler.help = ['wm']
handler.tags = ['general']
handler.alias = ['wm', 'take']
handler.command = /^(take|wm)$/i
export default handler

async function addExif(webpSticker, packname, author, categories = [''], extra = {}) {
  const img = new webp.Image();
  const json = { 'sticker-pack-id': 'Chandra XD 3.07', 'sticker-pack-name': packname, 'sticker-pack-publisher': author, 'emojis': categories, ...extra };
  let exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
  let jsonBuffer = Buffer.from(JSON.stringify(json), 'utf8');
  let exif = Buffer.concat([exifAttr, jsonBuffer]);
  exif.writeUIntLE(jsonBuffer.length, 14, 4);
  await img.load(webpSticker)
  img.exif = exif
  return await img.save(null)
}