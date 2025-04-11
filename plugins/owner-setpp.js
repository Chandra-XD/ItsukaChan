import { S_WHATSAPP_NET } from '@whiskeysockets/baileys'
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
				to: S_WHATSAPP_NET,
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
handler.alias = handler.help = ['setppbot']
handler.tags = ['owner']
handler.command = /^setpp(bot)?$/i
handler.owner = true
export default handler