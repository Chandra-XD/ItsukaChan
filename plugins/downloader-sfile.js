import axios from 'axios'

let handler = async (m, { conn, text }) => {
	if (text.match(/(https:\/\/sfile.mobi\/)/gi)) {
		let res = (await axios.get(API('can', '/api/download/sfiledl', { url: text } ))).data;
		if (!res) throw 'Error :/'
        let v = res.result
		m.reply(`• *Name:* ${v.name}\n• *Type:* ${v.type}\n• *Uploaded:* ${v.uploaded}\n• *Downloads:* ${v.downloads}\n• *Size:* ${v.size}\n• *Url:* ${v.url}\n\n_Sending file..._`)
		conn.sendMessage(m.chat, { document: { url: res.result.url }, fileName: res.result.name, mimetype: res.result.type }, { quoted: m })
	} else if (text) {
		let [query, page] = text.split`|`
		let res = (await axios.get(API('can', '/api/search/sfile', { query: text } ))).data;
		if (!res.result.length) throw `Query "${text}" not found :/`
		res = res.result.map((v) => `*Title:* ${v.title}\n*Size:* ${v.size}\n*Link:* ${v.link}`).join`\n\n`
		m.reply(res)
	} else throw 'Input Query / Sfile Url!'
}
handler.help = handler.alias = ['sfile'].map(v => v + ' <query / url>')
handler.tags = ['downloader']
handler.command = /^(sfile)$/i
export default handler