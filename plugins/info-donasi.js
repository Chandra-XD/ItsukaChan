import fs from 'fs'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn }) => {
let pp = fs.readFileSync('./thumbnail.jpg')
await conn.reply(m.chat, `Kamu bisa donasi di nomor dibawah ini
Atau menggunakan link saweria

Axis : 083848947227
Indosat : 085785705233
Tree : 08990085223
Saweria : https://saweria.co/pnggilajacn
Trakteer : https://trakteer.id/pnggilajacn`, { key: { fromMe: false,participant:"0@s.whatsapp.net", remoteJid: "status@broadcast"}, message: { orderMessage: { itemCount: 2023, status: 200, thumbnail: await conn.resize(pp, 100, 100), surface: 200, message: `Simple WhatsApp Bot`, orderTitle: 'ChandraXD', sellerJid: '0@s.whatsapp.net'}}, contextInfo: { forwardingScore :999, isForwarded: true }, sendEphemeral: true} )
await apivisit
}
handler.tags = ['info']
handler.command = /^dona(te|si)$/i
export default handler