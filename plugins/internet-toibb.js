import fetch from "node-fetch"
import { TMP } from '../lib/tempfile.js';

let handler = async (m, { conn, args }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || ''
	if (/image/.test(mime)) {
		await m.reply('Sedang diproses...')
		let media = await q.download()
		let link = await TMP(media)
		let noti = args[0] ? args[0] : 600
		let sauce = await UploadToIBB(noti, "15d7fb4992ffe4edf39c82740ad57a4a", link)
		let { id, title, url_viewer, url, display_url, width, height, size, time, expiration, image, thumb, medium, delete_url } = sauce.data
		await conn.reply(m.chat, `*Title :* ${title}\n*ID :* ${id}\n*Url Viewer :* ${url_viewer.replace('https://ibb.co/', 'https://ibb.co.com/')}\n*Url Image :* ${url}\n*Display Url :* ${display_url}\n*Delete :* ${delete_url.replace('https://ibb.co/', 'https://ibb.co.com/')}\n\n*Width :* ${width}\n*Height :* ${height}\n*Size :* ${size}\n*Expiration :* ${expiration}\n*Time :* ${time}`, m)
	} else throw 'Reply imagenya'
}
handler.help = ["toibb"]
handler.tags = ["internet"]
handler.command = ["toibb"]
export default handler

async function UploadToIBB(expiration, key, url) {
    let data = await fetch("https://api.imgbb.com/1/upload?expiration=" + expiration + "&key=" + key + "&image=" + url).then(v => v.json())
    return data
}