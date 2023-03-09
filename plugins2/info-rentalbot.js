import { apivisit } from './kanghit.js'

let handler = async (m, { conn }) => {
let templateButtons = [
    {index: 1, urlButton: {displayText: 'sᴀᴡᴇʀɪᴀ', url: `https://saweria.co/pnggilajacn` }},
    {index: 2, quickReplyButton: {displayText: 'ʀᴜʟᴇs', id: '.rules'}},
    {index: 3, quickReplyButton: {displayText: 'ᴏᴡɴᴇʀ', id: '.owner'}},
]
let url = API('can', '/api/cecan/random', {}, 'apikey')
let templateMessage = {
document: { url: `./src/font/Roboto-ThinItalic.ttf`},
jpegThumbnail: await conn.resize(url, 200, 200),
mimetype: global.doc,
fileName: `Hai kak ` + await conn.getName(m.sender),
fileLength: 999999999999999,
pageCount: 1234567890123456789012345,
caption: `*_List harga sewabot :_* 🤑
_5 Hari 4k_
_2 Minggu 10k_
_1 Bulan 17k_
_1 Tahun 50k_

*Pembayaran?? all payment*
Dana/ovo/gopay/qris
Via pulsa?? nambah 5k
Chat wa.me/6285785705233`,
mentions: [m.sender],
footer: `Lu nyari permanent bikin sendiri sono kont, lu kira nyewa panel pake daun`,
templateButtons: templateButtons
}
await conn.sendMessage(m.chat, templateMessage, { quoted: m, ephemeralExpiration: global.ephemeral, forwardingScore: 99999, isForwarded: true })
await apivisit
}
handler.command = /^(rental|iklan)$/i
export default handler