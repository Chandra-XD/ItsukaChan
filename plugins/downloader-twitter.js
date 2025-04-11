import axios from 'axios'
import cheerio from 'cheerio'

let handler = async (m, { conn, text }) => {
	if (!text) throw 'Input URL'
	if (!text.match(/(twitter.com|x.com)/gi)) throw `Invalid *URL*`
	try {
	await conn.sendMessage(m.chat, { react: { text: `🕑`, key: m.key }})
	let html = await (await axios.get("https://twtube.app/en/download?url="+ text)).data
    let $ = cheerio.load(html)
    let k = $('.square-box-img').get().map(el => 
    $(el).find('img').attr('src') || $(el).find('video').attr('src'))
    for (let x = 0; x < k.length; x++) {
		conn.sendFile(m.chat, k[x], '', null, m)
	}
  } catch (e) {
    console.log(e)
    throw `Error`
  }
}
handler.help = ['twitter'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.alias = ['twt', 'twtdl', 'twitter', 'twitterdl']
handler.command = /^((twt|twitter)(dl)?)$/i
export default handler