import { apivisit } from './kanghit.js'
import fs from 'fs'

let handler = async (m, { conn }) => {
let url = API('can', '/api/cecan/random', {}, 'apikey')
let pp = fs.readFileSync('./thumbnail.jpg')
let a = {
document: { url: `./src/font/Roboto-ThinItalic.ttf`},
jpegThumbnail: await conn.resize(url, 200, 200),
mimetype: global.doc,
fileName: `Hai kak ` + await conn.getName(m.sender),
fileLength: 999999999999999,
pageCount: 1234567890123456789012345,
caption: `List harga sewabot :
5 Hari 3k
2 Minggu 10k
1 Bulan 17k
1 Tahun 50k

Kamu Ingin jadibot?? disini aja, murah meriah!!
Bot sudah ada antispam 1 menit, fast respon, ringan dan online 24 jam nonstop

Fitur
Downloader
Tiktok, Instagram, Facebook, Mega, ZippyShare, SoundCloud, Telegram Sticker, Twitter, Cocofun, Google Drive, MediaFire, Gitclone, Ytmp3, Ytmp4, Pinterest

Special Fitur
Otakudesu Latest, Detail, Download
Nekopoi Latest, Detail, Download

Harga jadibot
5k 2 bulan!!
10k 5 bulan!!

*Pembayaran?? all payment*
Dana/ovo/gopay/qris
Via pulsa?? nambah 5k
Chat https://s.id/pnggilajacn`
}
await conn.sendMessage(m.chat, a, { quoted: { key: { fromMe: false,participant:"0@s.whatsapp.net", remoteJid: "status@broadcast"}, message: { orderMessage: { itemCount: 2023, status: 200, thumbnail: await conn.resize(pp, 100, 100), surface: 200, message: `Simple WhatsApp Bot`, orderTitle: 'ChandraXD', sellerJid: '0@s.whatsapp.net'}}, contextInfo: { forwardingScore :999, isForwarded: true }, sendEphemeral: true}, ephemeralExpiration: global.ephemeral, forwardingScore: 99999, isForwarded: true })
await apivisit
}
handler.command = /^(rental|iklan)$/i
export default handler