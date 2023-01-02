import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
let res = await fetch('https://raw.githubusercontent.com/Chandra-XD/cn-grabbed-result/main/media/image/cecan.txt')
let txt = await res.text()
let arr = txt.split('\n')
let cita = arr[Math.floor(Math.random() * arr.length)]
let cuy = await(await fetch(cita)).buffer()
let gueh = `Chandra-XD`
let repositoy = `ItsukaChan`
let templateButtons = [
    {index: 1, urlButton: {displayText: 'sᴀᴡᴇʀɪᴀ', url: `https://saweria.co/pnggilajacn` }},
    {index: 2, urlButton: {displayText: 'ᴛʀᴀᴋᴛᴇᴇʀ', url: `https://trakteer.id/pnggilajacn` }},
    {index: 3, quickReplyButton: {displayText: 'ᴏᴡɴᴇʀ', id: '.owner'}},
]
let templateMessage = {
location: { jpegThumbnail: await conn.resize(cuy, 200, 200)},
caption: `Bot ini menggunakan script dari :\n\nhttps://github.com/${gueh}/${repositoy}\n\nBtw jangan lupa di fork + kasi star nya kak ⭐`,
footer: wm2,
templateButtons: templateButtons
}
conn.sendMessage(m.chat, templateMessage, { quoted: m, ephemeralExpiration: global.ephemeral, forwardingScore: 99999, isForwarded: true })
}
handler.help = ['sc']
handler.tags = ['main']
handler.command = /^(sc|sourcecode)$/i
export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}