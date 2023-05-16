import jimp_1 from 'jimp'
import { URL_REGEX } from '@adiwajshing/baileys'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, args }) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''
let botNumber = await conn.user.jid
if (/image/g.test(mime) && !/webp/g.test(mime)) {
let media = await q.download()
let { img } = await pepe(media)
			await conn.query({
				tag: 'iq',
				attrs: {
					to: botNumber,
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
			await m.reply(`Succes update profile bot`)
			await apivisit
} else if (args[0] && args[0].match(URL_REGEX)) {
let { img } = await pepe(args[0])
			await conn.query({
				tag: 'iq',
				attrs: {
					to: botNumber,
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
			await m.reply(`Succes update profile bot`)
			await apivisit
			} else throw 'Where\'s the media?'
}
handler.alias = handler.help = ['setppbot']
handler.tags = ['owner']
handler.command = /^setpp(bot)?$/i
handler.owner = true
export default handler

async function pepe(media) {
	const jimp = await jimp_1.read(media)
	const min = jimp.getWidth()
	const max = jimp.getHeight()
	const cropped = jimp.crop(0, 0, min, max)
	return {
		img: await cropped.scaleToFit(720, 720).getBufferAsync(jimp_1.MIME_JPEG),
		preview: await cropped.normalize().getBufferAsync(jimp_1.MIME_JPEG)
	}
}