import axios from 'axios'
import * as cheerio from 'cheerio'
import baileys from '@whiskeysockets/baileys'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (text.match(baileys.URL_REGEX)) {
		let res = await wiGetDatalink(text)
		let txt = ''
		for (let x = 0; x < res.length; x++) {
			txt += `\n*Langkah ${x + 1}*\n`
			txt += `\t${res[x].title}\n`
			txt += `\t\t${res[x].data}\n`
		}
		m.reply(txt.trim())
	} else if (text) {
		let res = await wiSearchQuery(text)
		if (!res.length) throw `Query "${text}" Not Found`
		let teksnya = res.map((v) => `${v.title}\n${v.view}\n${v.link}`).join('\n\n')
		await m.reply(`Berikut adalah informasi yang kita dapat dari wikihow\n\n${teksnya}`)
	} else throw 'Input Query' 
}
handler.help = ['wikihow']
handler.tags = ['tools']
handler.command = /^(wikihow)$/i
export default handler

export function wiSearchQuery(quer) {
	return new Promise((resolve, reject) => {
		axios.get("https://id.wikihow.com/wikiHowTo?search=" + quer).then((response) => {
			if (response.status === 200) {
				const html = response.data
				const $ = cheerio.load(html)
				let data = []
				$("div a.result_link").each(function(a, b) {
					data.push({
						"title": $(b).find("div.result_title").text().trim(),
						"view": $(b).find("li.sr_view").text().trim().replace(/[\t]/g, "").replace(/[\n]/g, " "),
						"link": $(b).attr("href"),
					})
				})
				resolve(data)
			}
		})
	})
}

export function wiGetDatalink(url) {
	return new Promise((resolve, reject) => {
		axios.get(url).then((response) => {
			if (response.status === 200) {
				const html = response.data
				const $ = cheerio.load(html)
				let data = []
				$("div.step").each(function(a, b) {
					data.push({
						"title": $(b).find("b").text().trim(),
						"data": $(b).find("li").text().trim().replace(/[\[\]0-9]/g, "").replace(/[\t]/g, "").replace(/[\n]/g, " ")
					})
				})
				resolve(data)
			}
		})
	})
}
