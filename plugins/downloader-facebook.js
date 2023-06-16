import axios from 'axios'
import cheerio from 'cheerio'
import { apivisit } from './kanghit.js'
import { savefrom } from '@bochilteam/scraper'

let handler = async (m, { conn, args, command }) => {
	if (!args[0]) throw 'Input URL'
	await m.reply('Sedang diproses...')
	try {
	let api = await FaceBook(args[0])
	await conn.sendMessage(m.chat, { video: { url: api?.video_hd || api?.video_sd }, caption: api?.desc || ' '}, { quoted: m })
	await apivisit
	} catch {
	try {
	let res = await savefrom(args[0]).catch(_ => null)
	// if (!res) throw 'Error 404 Not Found'
  	await conn.sendMessage(m.chat, { video: { url: res?.hd?.url || res?.url?.[0]?.url || res?.sd?.url }, caption: res?.meta?.title || ' '}, { quoted: m })
	await apivisit
	} catch (e) {
		console.log(e)
		m.reply(`Terjadi kesalahan.`)
	}
} }
handler.help = handler.alias = ['facebook'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^((facebook|fb)(dl)?)$/i
export default handler


function FaceBook(url){
  return new Promise(async(resolve, reject) => {
    try {
      const config = {
        'id': url,
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
      if (status === 200) {
        const $ = cheerio.load(data)
        const thumb = $('div.container > div.results-item > div.results-item-image-wrapper').find('img').attr('src')
        const desc = $('div.container > div.results-item > div.results-item-text').text().trim()
        const video_hd = $('div.container > div.results-download > ul > li:nth-child(1) > a').attr('href')
        const video_sd = $('div.container > div.results-download > ul > li:nth-child(2) > a').attr('href')
        const hasil = {
          desc: desc,
          thumb: thumb,
          video_sd: video_sd,
          video_hd: video_hd
        };
        resolve(hasil)
      } else {
        console.log('No result found')
      }
    } catch (error) {
      console.error(error)
    }
  })
}