import axios from 'axios'
import cheerio from 'cheerio'
import { apivisit } from './kanghit.js'
import { savefrom } from '@bochilteam/scraper'

let handler = async (m, { conn, args, command }) => {
    if (!args[0]) throw `Input *URL*`
	await m.reply('Sedang diproses...')
	try {
    var api = await Instagram(args[0])
    for (let x = 0; x < api.slide_length; x++) {
		conn.sendFile(m.chat, api.slide[x], '', ``, m)
	}
	await apivisit
	} catch {
	try {
	let res = await savefrom(args[0]).catch(_ => null)
	//if (!res) throw 'Error 404 Not Found'
	await conn.sendMessage(m.chat, { video: { url: res?.url?.[0]?.url }, caption: res?.meta?.title || '' }, { quoted: m })
	await apivisit
	} catch (e) {
		console.log(e)
		m.reply(`Terjadi kesalahan.`)
	}
} }
handler.help = ['instagram'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.alias = ['ig', 'igdl', 'instagram', 'instagramdl']
handler.command = /^(ig(dl)?|instagram(dl)?)$/i
export default handler


function Instagram(url){
  return new Promise(async(resolve, reject) => {
    try {
      const config = {
        'url': url,
        'submit': ''
      }
      const { data, status, headers } = await axios('https://downloadgram.org/', {
        method: 'POST',
        data: new URLSearchParams(Object.entries(config)),
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.46",
          "cookie": "_ga=GA1.2.2121395638.1671172225; _gid=GA1.2.519005301.1671172225; __gads=ID=e8410c1ba2d24a2d-22a64184ebd800f4:T=1671172219:RT=1671172219:S=ALNI_Mb1AgoUIMTEUaH7QfenBiIcWRELPg; __gpi=UID=00000b914d13b7b4:T=1671172219:RT=1671172219:S=ALNI_MZgo_0w4Isg0hciJVVVjg4RKcl1Pg; __atuvc=5%7C50; __atuvs=639c1080f62ec79d004; _gat_gtag_UA_142480840_1=1; FCNEC=%5B%5B%22AKsRol_PHRocR55hohw-JKbsqqpOx2xRcc645IImzRbkPjvUNzvwUqhcVVIfIDT7C6K_uwGWhqhVk-bAQC0bdKMBlkhj2nhPpDB5sjKqbw8fGdof8FkpatvwsibBPVnx1ekvZnLk29coUmy59u5TSez4HH8_1SNv1Q%3D%3D%22%5D%2Cnull%2C%5B%5D%5D"
        }
      })
      const $ = cheerio.load(data)
      let hasil = []
      $('#downloadhere > a').each(function (i, u) {
        hasil.push($(u).attr('href'))
      })
      if (hasil.every(x => x === undefined)) return resolve({ Creator: 'Chandra XD', status: 404, mess: 'No result found', result: { link: 'https://i.ibb.co/G7CrCwN/404.png', slide: ['https://i.ibb.co/G7CrCwN/404.png'], slide_length: 404 } })
      const hsil = {
        link: hasil[0],
        slide: hasil,
        slide_length: hasil.length
      }
      resolve(hsil)
    } catch (error) {
      console.error(error)
    }
  })
}