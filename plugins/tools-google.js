import { googleIt } from '@bochilteam/scraper'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, text }) => {
    if (!text) throw 'Input Query'
    let search = await googleIt(text)
    let msg = search.articles.map((v) => `*${v.title}*\n_${v.url}_\n_${v.description}_`).join('\n\n')
    if (!msg.length) throw 'Not Found :/'
    await m.reply(msg)
    await apivisit
}
handler.help = handler.alias = ['google'].map(v => v + ' <query>')
handler.tags = ['tools']
handler.command = /^google$/i
export default handler