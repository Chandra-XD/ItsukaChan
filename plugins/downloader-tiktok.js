import axios from 'axios'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, args, usedPrefix: _p, command }) => {
	if (!args[0]) throw 'Input URL' 
	if (!/(?:https:?\/{2})?(?:w{3}|vm|vt|t)?\.?tiktok.com\/([^\s&]+)/gi.test(args[0])) throw 'Invalid URL'
	let { data, code, msg } = await tiktokDl(args[0])
	if (code !== 0) throw msg
	await conn.sendMessage(m.chat, { react: { text: `🕑`, key: m.key }})
	if (data?.images?.length) {
		for (let x = 0; x < data.images.length; x++) {
			let capt = x == 0 ? data.title : ''
			await conn.sendMessage(m.chat, { image: { url: data.images[x] }, caption: capt }, { quoted: m })
			await apivisit
		}
	} else {
		// let vid = /hd$/i.test(args[1]) ? `https://www.tikwm.com${data.hdplay}` : `https://www.tikwm.com${data.play}`
		let desc = `${formatK(data.digg_count)} Likes, ${formatK(data.comment_count)} Comments. TikTok video from ${data.author.nickname} (@${data.author.unique_id}): "${data.title}". ${data.music_info.title}.`
		let buttons = [{ buttonText: { displayText: 'Audio' }, buttonId: `${_p}tomp3` }]
		if (!/hd$/i.test(args[1])) buttons.push({ buttonText: { displayText: 'HD Quality' }, buttonId: `${_p + command} ${args[0]} -hd` })
//		await conn.sendMessage(m.chat, { video: { url: vid }, caption: desc, footer: wm, buttons }, { quoted: m })
    await conn.sendMessage(m.chat, { video: { url: `https://www.tikwm.com${data.play}` }, caption: desc }, { quoted: m })
		await apivisit
	}
}
handler.help = ['tiktok'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(tt|tiktok)(dl|nowm)?$/i

export default handler

function formatK(num) {
	return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(num)
}

export async function tiktokDl(url) {
	let res = await axios.post('https://www.tikwm.com/api', {}, {
		params: { url, count: 12, cursor: 0, web: 1, hd: 1 }
	})
	return res.data
}