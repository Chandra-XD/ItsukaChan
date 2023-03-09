import fs from 'fs'
import { apivisit } from './kanghit.js'

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `uhm.. teksnya mana?\n\npenggunaan:\n${usedPrefix + command} <teks>\n\ncontoh:\n${usedPrefix + command} plugins/melcanz.js`
    if (!m.quoted.text) throw `balas pesan nya!`
    let path = `${text}`
    await fs.writeFileSync(path, m.quoted.text)
    await m.reply(`Tersimpan di ${path}`)
    await apivisit
}
handler.help = ['sf'].map(v => v + ' <teks>')
handler.tags = ['owner']
handler.command = /^sf$/i
handler.rowner = true
export default handler