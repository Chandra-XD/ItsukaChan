import axios from 'axios'

let handler = async (m, { conn, text }) => {
	if (!text) throw 'Input URL'
	if (!text.match(/(twitter.com|x.com)/gi)) throw `Invalid *URL*`
	try {
	await conn.sendMessage(m.chat, { react: { text: `🕑`, key: m.key }})
	let api = await (await axios.get("https://api.deline.web.id/downloader/twitter?url="+ text)).data
    await conn.sendFile(m.chat, api.data.downloadLink, '', `Title : `+ api.data.videoTitle + `\n` + `Description : ` + api.data.videoDescription, m)
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