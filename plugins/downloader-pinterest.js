import * as cheerio from 'cheerio'
import fetch from 'node-fetch'
import { lookup } from 'mime-types'
import { URL_REGEX } from '@whiskeysockets/baileys'

let handler = async (m, { conn, text }) => {
	text = text.endsWith('SMH') ? text.replace('SMH', '') : text 
	if (!text) throw 'Input Query / Pinterest Url'
	let res = await pinterest(text)
	let mime = await lookup(res)
	text.match(URL_REGEX) ?
	    await conn.sendMessage(m.chat, { document: { url: res }, fileName: `Pinterest Downloader`, mimetype: mime, caption: `Succes Download: ${res}`}, { quoted: m}) :
		// await conn.sendMessage(m.chat, { [mime.split('/')[0]]: { url: res }, caption: `` }, { quoted: m }) :
	await conn.sendMessage(m.chat, { image: { url: res }, caption: `Result From: ${text.capitalize()}`}, { quoted: m })
}
handler.help = handler.alias = ['pinterest'].map(v => v + ' <query / url>')
handler.tags = ['downloader']
handler.command = /^(pin|pinterest)$/i

export default handler

async function pinterest(query) {
	if (query.match(URL_REGEX)) {
	let sv = await (await fetch(`https://www.savepin.app/download.php?url=${query}&lang=en&type=redirect`)).text()
	let $ = cheerio.load(sv)
	let data = $('.container').get().map(el => 
    $(el).find('img').attr('src') || $(el).find('video').attr('src'))
    return data.find(a => a.startsWith('https:'))
	} else {
		let res = await fetch(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${query}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${query}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`)
		let json = await res.json()
		let data = json.resource_response.data.results
		if (!data.length) throw `Query "${query}" not found :/`
		return data[~~(Math.random() * (data.length))].images.orig.url
	}
}
