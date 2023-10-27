import { webp2mp4 } from '../lib/webp2mp4.js'

let handler = async (m, { conn }) => {
	if (m.quoted && /sticker/.test(m.quoted.mtype) && !m.quoted.isAnimated) {
		let img = await m.quoted.download()
		await conn.sendMessage(m.chat, { image: img, jpegThumbnail: img }, { quoted: m })
	} else if (m.quoted && /sticker/.test(m.quoted.mtype) && m.quoted.isAnimated) {
	let q = m.quoted ? m.quoted : m
    let media = await q.download?.()
    let out = Buffer.alloc(0)
    if (/sticker/.test(m.quoted.mtype)) {
        out = await webp2mp4(media)
    }
    await conn.sendMessage(m.chat, {
                video: { url: out },
                gifPlayback: true,
                gifAttribution: Math.floor(Math.random() * 2) + 1
            }, {
                quoted: m
            })
	} else throw 'Reply a sticker!'
}
handler.help = ['toimg']
handler.tags = ['general']
handler.alias = ['toimg', 'togif', 'tovid', 'tovideo']
handler.command = /^to(img|gif|vid|video)$/i
export default handler
