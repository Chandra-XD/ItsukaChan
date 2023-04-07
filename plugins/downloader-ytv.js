let limit = 80
import axios from 'axios'
import yts from 'yt-search'
import { validateURL, getVideoID } from '../lib/ytUrlUtils.js'
import { youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, args, isPrems, isOwner }) => {
	// let key = 'AIzaSyA2-LY3jRpNm1ycJ_ribbSOvOr99wMQQqA'
	if (validateURL(args[0])) {
		let id = await getVideoID(args[0]), vid = await yts({ videoId: id }), opt = args[1] && args[1].isNumber() ? args[1].replace(/\D/g, '') : ''
		let { description: desc, timestamp, views, uploadDate, ago, author: { name }} = vid
		let { thumbnail, video: _video, title } = await youtubedlv2(args[0]).catch(async _ => await youtubedl(args[0])).catch(async _ => await youtubedlv3(args[0]))
		await m.reply('Sedang diproses...')
		let limitedSize = (isPrems || isOwner ? 99 : limit) * 1024
		let video, quality, link, lastError, isLimit // source 
		for (let i in _video) {
			try {
				video = _video[i]
				quality = video.quality
				console.log(video)
				isLimit = video.fileSize > limitedSize
				if (isLimit && /1080p/.test(quality) || !quality.includes(opt)) continue 
				link = await video.download()
				if (link) break 
			} catch (e) {
				video = quality = link = null
				lastError = e
				continue 
			}
		}
		if (!link) throw 'Error: ' + (lastError || 'Can\'t download video')
		let _thumb = {}
		try { _thumb = { jpegThumbnail: (await conn.getFile(thumbnail)).data } }
		catch (e) { }
		await conn.sendMessage(m.chat, { [/^(?:-|--)doc$/i.test(args[1]) || isLimit ? 'document' : 'video']: { url: link }, fileName: `${title}.mp4`, mimetype: 'video/mp4', ..._thumb }, { quoted: m }).then(async (msg) => {
			let caption = `*Title:* ${title}\n*Quality:* ${quality}\n*Channel:* ${name}\n*Duration:* ${timestamp}\n`
				+ `*Upload Date:* ${uploadDate}\n*Views:* ${views}${desc ? `\n*Description:*\n${desc}` : ''}`.trim()
			await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption }, { quoted: msg })
		})
		await apivisit
	} else throw 'Invalid URL'
}
handler.help = ['mp4'].map(v => 'yt' + v + ` <url>`)
handler.tags = ['downloader']
handler.command = /^yt(v|mp4)?$/i
export default handler

function convertTime(num) {
	num = num.match(/(\d+)(?=[HMS])/gi) || []
	num = num.map((v) => {
		if (v.length < 2) return '0' + v
		return v
	}).join(':')//.padStart(5, '00:0')
	return num
}

async function shortUrl(url) {
	url = encodeURIComponent(url)
	let res = await axios.get(`https://is.gd/create.php?format=simple&url=${url}`)
	return res.data
}