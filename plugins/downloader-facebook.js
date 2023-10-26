import axios from 'axios'
import cheerio from 'cheerio'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, args, command }) => {
	if (!args[0]) throw 'Input URL'
	try {
	const config = {
        'id': args[0],
        'locale': 'id'
      }
    const { data, status } = await axios('https://getmyfb.com/process', {
        method: 'POST',
        data: new URLSearchParams(Object.entries(config)),
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
          "cookie": "PHPSESSID=914a5et39uur28e84t9env0378; popCookie=1; prefetchAd_4301805=true"
        }
      })
      const $ = cheerio.load(data)
      const TT = $('div.container > div.results-item > div.results-item-text').text().trim()
      const HD = $('div.container > div.results-download > ul > li:nth-child(1) > a').attr('href')
      const SD = $('div.container > div.results-download > ul > li:nth-child(2) > a').attr('href')
	await conn.sendMessage(m.chat, { video: { url: HD || SD }, caption: TT || ' '}, { quoted: m })
	await apivisit
	} catch (e) {
		m.reply(`Terjadi kesalahan.`)
	}
}
handler.help = handler.alias = ['facebook'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^((facebook|fb)(dl)?)$/i
export default handler
