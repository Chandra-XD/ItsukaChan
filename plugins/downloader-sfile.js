import * as cheerio from 'cheerio'
import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
	if (text.match(/(https:\/\/sfile.mobi\/)/gi)) {
		let res = await sfile.download(text)
		if (!res) throw 'Error :/'
		await m.reply(Object.keys(res).map(v => `*• ${v.capitalize()}:* ${res[v]}`).join('\n') + '\n\n_Sending file..._')
		conn.sendMessage(m.chat, { document: { url: res.url }, fileName: res.name, mimetype: res.type }, { quoted: m })
	} else if (text) {
		let [query, page] = text.split`|`
		let res = await sfile.search(query, page)
		if (!res.length) throw `Query "${text}" not found :/`
		res = res.map((v) => `*Title:* ${v.title}\n*Size:* ${v.size}\n*Link:* ${v.link}`).join`\n\n`
		m.reply(res)
	} else throw 'Input Query / Sfile Url!'
}
handler.help = handler.alias = ['sfile'].map(v => v + ' <query / url>')
handler.tags = ['downloader']
handler.command = /^(sfile)$/i
export default handler

const sfile = {
 async search(query, page = 1) {
	let res = await fetch(`https://sfile.mobi/search.php?q=${query}&page=${page}`)
	let $ = cheerio.load(await res.text())
	let result = []
	$('div.list').each(function () {
		let title = $(this).find('a').text()
		let size = $(this).text().trim().split('(')[1]
		let link = $(this).find('a').attr('href')
		if (link) result.push({ title, size: size.replace(')', ''), link })
	})
	return result
},
	async download(url) {
		let html = await (await fetch(url)).text()
		let $ = cheerio.load(html)
		let $list = $('.list')
		let $dl = $('#download')
		
		let $k = (($dl.attr('onclick') || '').match(/&k=\'\+\'(\w+)/) || '')[1]
    console.log($k)
		if (!$k) throw 'Can\'t download'
		
		return {
			name: $('img.intro').attr('alt'),
			type: $list.eq(0).text().split('- ')[1],
			uploaded: $list.eq(2).text().split('Uploaded: ')[1],
			downloads: +$list.eq(3).text().split('Downloads: ')[1],
			size: ($dl.text().match(/\((.*?)\)/) || '')[1],
			url: $dl.attr('href') + '&k=' + $k
		}
	}
}
