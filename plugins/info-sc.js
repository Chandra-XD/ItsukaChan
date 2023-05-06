import { apivisit } from './kanghit.js'

let handler = async (m, { conn }) => {
await m.reply(`Bot ini menggunakan script dari :\n\nhttps://github.com/Chandra-XD/ItsukaChan\n\nBtw jangan lupa di fork + kasi star nya kak ⭐`)
await apivisit
}
handler.help = ['sc']
handler.tags = ['info']
handler.command = /^(sc|sourcecode)$/i
export default handler