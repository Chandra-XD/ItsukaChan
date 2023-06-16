/* import { webp2png } from '../lib/webp2mp4.js'
import { URL_REGEX } from '@adiwajshing/baileys'

let handler = async (m, { conn, args }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || q.mediaType || ''
  if (/image/.test(mime)) {
    let url = await webp2png(await q.download())
    await conn.updateProfilePicture(m.chat, { url }).then(_ => m.reply('Success update profile picture'))
  } else if (args[0] && args[0].match(URL_REGEX)) {
    await conn.updateProfilePicture(m.chat, { url: args[0] }).then(_ => m.reply('Success update profile picture'))
  } else throw 'Where\'s the media?'
}
handler.help = ['setppgrup']
handler.tags = ['group']
handler.alias = ['setppgc', 'setppgrup', 'setppgroup']
handler.command = /^setpp(gc|grup|group)$/i
handler.group = handler.admin = handler.botAdmin = true
export default handler
*/
import Jimp from 'jimp'
import { URL_REGEX } from '@adiwajshing/baileys'

let handler = async (m, { conn, args }) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''
let group = m.chat
if (/image/.test(mime)) {
var media = await q.download()
            var { img } = await generateProfilePicture(media)
            await conn.query({
            tag: 'iq',
            attrs: {
            to: group, 
            type:'set',
            xmlns: 'w:profile:picture'
            },
            content: [
            {
            tag: 'picture',
            attrs: { type: 'image' },
            content: img
            }
            ]
            })
            m.reply(`Succes update profile group ✓`)
} else if (args[0] && args[0].match(URL_REGEX)) {
            var { img } = await generateProfilePicture(args[0])
            await conn.query({
            tag: 'iq',
            attrs: {
            to: group, 
            type:'set',
            xmlns: 'w:profile:picture'
            },
            content: [
            {
            tag: 'picture',
            attrs: { type: 'image' },
            content: img
            }
            ]
            })
            m.reply(`Succes update profile group ✓`)
            } else throw 'Where\'s the media?'
}
handler.help = ['setppgrup']
handler.tags = ['group']
handler.alias = ['setppgc', 'setppgrup', 'setppgroup']
handler.command = /^setpp(gc|grup|group)$/i
handler.group = handler.admin = handler.botAdmin = true
export default handler

async function generateProfilePicture(buffer) {
	const jimp_1 = await Jimp.read(buffer);
	const minz = jimp_1.getWidth() > jimp_1.getHeight() ? jimp_1.resize(720, Jimp.AUTO) : jimp_1.resize(Jimp.AUTO, 720)
	const jimp_2 = await Jimp.read(await minz.getBufferAsync(Jimp.MIME_JPEG));
	return {
	  img: await minz.getBufferAsync(Jimp.MIME_JPEG)
	}
}