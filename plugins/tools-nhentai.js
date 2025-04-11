import axios from "axios"
import fetch from "node-fetch"
let handler = async(m, { conn, args }) => {
if (isNaN(args[0])) {
let [query, page] = args.join(' ').split('|')
page = +page || 1
let { data } = await axios.get(`https://same.yui.pw/api/v6/search/${query}/popular/${page}`).catch(e => e.response)
if (!data.result?.[0] || !data || page > data.num_pages) throw `Query "${query}" Not Found`
let tekss = data.result.map(x => { return `ID: ${x.id}\nTitle: ${x.title.english || x.title.pretty || x.title.japanese}\nLang: ${x.lang}\nPages: ${x.num_pages}`}).filter(x => x).join('\n\n')
await m.reply(tekss)
} else {
try {
let data = await nhentaiScraper(args[0])
let pages = []
let thumb = `https://t.nhentai.net/galleries/${data.media_id}/cover.jpg`
data.images.pages.map((v, i) => {
			let ext = new URL(v.t).pathname.split('.')[1]
			pages.push(`https://i.nhentai.net/galleries/${data.media_id}/${i + 1}.${ext}`)
		})
let imagepdf = await axios.post("https://mxmxk-helper.hf.space/topdf", { images: pages }, { responseType: 'arraybuffer' })
if (imagepdf.headers['content-type'] !== 'application/pdf') throw imagepdf.data.toString()
await conn.sendMessage(m.chat, { document: imagepdf.data, fileName: data.title.english + '.pdf', jpegThumbnail: await conn.resize(thumb, 200, 200), mimetype: 'application/pdf' }, { quoted: m })
} catch (e) {
await m.reply("Error :\n\n"+ e)
}
}
}
handler.command = /^(nhentai|nhpdf)$/i
handler.tags = ['tools']
handler.help = ['nhentai']
export default handler 

async function nhentaiScraper(id) {
	let uri = id ? `https://cin.guru/v/${+id}/` : 'https://cin.guru/'
	let html = (await axios.get(uri)).data
	return JSON.parse(html.split('<script id="__NEXT_DATA__" type="application/json">')[1].split('</script>')[0]).props.pageProps.data
}