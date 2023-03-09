import axios from 'axios'
import cheerio from 'cheerio'
import baileys from '@adiwajshing/baileys'
import { apivisit } from './kanghit.js'

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
		let array = []
		for (let i = 0; i < res.length; i++) array.push({
			title: res[i].title,
			description: res[i].view,
			rowId: `${usedPrefix + command} ${res[i].link}`
		})
		let json = {
			listMessage: {
				title: 'Berikut adalah informasi yang kita dapat dari wikihow\n',
				description: `Terdapat ${res.length} hasil pencarian yang kita temukan.\nKlik tombol dibawah untuk menuju berikutnya.`,
				buttonText: 'Tap Here !',
				listType: 1,
				sections: [{ title: 'WIKIHOW', rows: [ ...array ] }],
				productListInfo: {},
				footerText: null,
				contextlnfo: {}
			}
		}
		let listM = await baileys.generateWAMessageFromContent(m.chat, json, {})
		await conn.sendMessage(m.chat, { forward: listM }, { quoted: m })
		await apivisit
	} else throw 'Input Query' 
}
handler.help = ['wikihow'].map(v => v + ' <query>')
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