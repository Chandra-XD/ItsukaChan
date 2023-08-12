import yts from 'yt-search'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper-sosmed'
import { validateURL, getVideoID } from '../lib/ytUrlUtils.js'

let handler = async (m, { conn, args }) => {
	if (validateURL(args[0])) {
		let id = await getVideoID(args[0]), vid = await yts({ videoId: id }), opt = args[1] && args[1].isNumber() ? args[1].replace(/\D/g, '') : ''
		let { thumbnail, title, description: desc, timestamp, views, uploadDate, ago, author: { name }} = vid
		await m.reply('Sedang diproses...')
		let yt = await youtubedl(args[0]).catch(async () => await youtubedlv2(args[0]))
		let dl_url = await yt.video['360p'].download()
		let size = await yt.video['360p'].fileSizeH
		let _thumb = {}
		try { _thumb = { jpegThumbnail: (await conn.getFile(thumbnail)).data } }
		catch (e) { }
		if (size.split('MB')[0] >= 250) return m.reply(`File melebihi batas unduhan, download sendiri!!\n*Url :* ${dl_url}`)    
		await conn.sendMessage(m.chat, { [/^(?:-|--)doc$/i.test(args[1]) ? 'document' : 'video']: { url: dl_url }, fileName: `${title}.mp4`, mimetype: 'video/mp4', ..._thumb }, { quoted: m }).then(async (msg) => {
			let caption = `*Title:* ${title}\n*Channel:* ${name}\n*Duration:* ${timestamp}\n*Upload Date:* ${uploadDate}\n*Views:* ${views}\n*Description:*\n${desc}`
			await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption }, { quoted: msg })
		})
	} else throw 'Invalid URL'
}
handler.help = ['mp4'].map(v => 'yt' + v + ` <url>`)
handler.tags = ['downloader']
handler.command = /^yt(v|mp4)?$/i
export default handler