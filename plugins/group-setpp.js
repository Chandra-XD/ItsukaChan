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
import Jimp from "jimp";

let handler = async (m, { conn, args }) => {
const q = m.quoted ? m.quoted : m;
		const mime = q.mtype || "";

		if (!/image|document/g.test(mime)) {
			return m.reply("Please reply/send a image with the command");
		}

		const media = await q.download();

        async function pepek() {
            const image = await Jimp.read(media);
            const mwmwx = image.getWidth() > image.getHeight() ? image.resize(720, Jimp.AUTO) : image.resize(Jimp.AUTO, 720)
            return {
              img: await mwmwx.getBufferAsync(Jimp.MIME_JPEG)
            }
        }

        let { img } = await pepek();
        if (!img) {
            return m.reply("Failed.")
        }

		await conn.query({
			tag: "iq",
			attrs: {
				to: m.chat,
				type: "set",
				xmlns: "w:profile:picture",
			},
			content: [
				{
					tag: "picture",
					attrs: { type: "image" },
					content: img,
				},
			],
		})

		m.reply("Successfully change profile picture.")
}
handler.help = ['setppgrup']
handler.tags = ['group']
handler.alias = ['setppgc', 'setppgrup', 'setppgroup']
handler.command = /^setpp(gc|grup|group)$/i
handler.group = handler.admin = handler.botAdmin = true
export default handler