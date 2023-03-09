import { extract } from 'zs-extract'
import { lookup } from 'mime-types'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, args }) => {
  if (!args[0]) throw 'Input URL'
  if (!args[0].includes('zippyshare.com/v')) throw 'Invalid URL'
  await m.reply('Sedang diproses...')
  for (let i = 0; i < args.length; i++) {
    if (!args[i].includes('zippyshare.com/v')) continue
    let res = await extract(args[i])
    let mimetype = await lookup(res.download)
    conn.sendMessage(m.chat, { document: { url: res.download }, fileName: res.filename, mimetype }, { quoted: m })
  }
  await apivisit
}
handler.help = ['zippyshare'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.alias = ['zs', 'zippy', 'zippydl', 'zippyshare']
handler.command = /^z(s|ippy(dl|share)?)$/i 
export default handler