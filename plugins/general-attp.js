import { Sticker } from 'wa-sticker-formatter'

let handler = async (m, { conn, text, command }) => {
if (!text) throw `Input *text*`
if (command == 'attp') {
let img = global.API('can', '/api/maker/attp', { text }, 'apikey')
let stiker = await createSticker(img, false, global.packname, global.author)
m.reply(stiker)
}
if (command == 'ttp') {
let img = global.API('can', '/api/maker/ttp', { text }, 'apikey')
let stiker = await createSticker(img, false, global.packname, global.author)
m.reply(stiker)
}
}

handler.help = ['attp', 'ttp'].map(v => v + ' <text>')
handler.tags = ['general']
handler.command = handler.alias = ['attp', 'ttp']
export default handler

async function createSticker(img, url, packName, authorName, quality) {
	let stickerMetadata = {
		type: 'full',
		pack: packName,
		author: authorName,
		quality
	}
	return (new Sticker(img ? img : url, stickerMetadata)).toBuffer()
}
