import { join, path } from 'path'
import {readdirSync,statSync,unlinkSync,existsSync,readFileSync,watch} from 'fs'
let handler = async (m, { args, text }) => {
conn.sendMessage(m.chat, {react : { text : '🚮', key : m.key}})
conn.reply(m.chat, 'Udah can 😘', m)
const tmp = [join(__dirname, '../tmp')]
  const filename = []
  tmp.forEach(dirname => readdirSync(dirname).forEach(file => filename.push(join(dirname, file))))
  return filename.map(file => {
    const stats = statSync(file)
    unlinkSync(file)
})
}
handler.help = ['cleartmp']
handler.tags = ['owner']
handler.command = /^(ctm)$/i
handler.owner = true
export default handler