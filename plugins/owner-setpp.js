import { S_WHATSAPP_NET } from '@whiskeysockets/baileys'
import { Jimp, JimpMime } from "jimp";

let handler = async (m, { conn, args }) => {
const q = m.quoted ? m.quoted : m;
		const mime = q.mtype || "";

		if (!/image|document/g.test(mime)) {
			return m.reply("Please reply/send a image with the command");
		}

		const media = await q.download();

		async function pp() {
			const image = await Jimp.read(media);
			let resized;
			if (image.width > image.height) {
				resized = image.resize({ w: 720, h: Jimp.RESIZE_AUTO });
			} else {
				resized = image.resize({ w: Jimp.RESIZE_AUTO, h: 720 });
			}
			return {
				img: await resized.getBuffer(JimpMime.jpeg),
			};
		}

        let { img } = await pp();
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