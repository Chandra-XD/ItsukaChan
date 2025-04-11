import axios from 'axios'
import cheerio from 'cheerio'

let handler = async (m, { conn, args }) => {
	if (!args[0]) throw 'Input URL'
	if (!/danbooru\.donmai\.us\/posts\/[0-9]+$/i.test(args[0])) throw `Invalid *URL*`
	await conn.sendMessage(m.chat, { react: { text: `🕑`, key: m.key }})
	let data = await danbooruDl(args[0]), img = data.url
	delete data.url
	let capt = Object.keys(data).map((x) => `${x}: ${data[x]}`).join`\n`
	await conn.sendFile(m.chat, img, '', capt, m)
}
handler.help = ['danbooru'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^danbooru$/i
export default handler

export async function danbooruDl(url) {
	let html = (await axios.get(url)).data
	let $ = cheerio.load(html), obj = {}
	$('#post-information > ul > li').each((idx, el) => {
		let str = $(el).text().trim().replace(/\n/g, '').split(': ')
		obj[str[0]] = str[1].replace('»', '').trim().split(' .')[0]
	})
	obj.url = $('#post-information > ul > li[id="post-info-size"] > a').attr('href')
	return obj
}