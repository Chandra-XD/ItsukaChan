
let handler = async (m, { conn, args }) => {
    if (/^https?:\/\/.*youtu/i.test(args[0])) {
    conn.sendMessage(m.chat, { react: { text: `🕑`, key: m.key }})
    let api = await axios.get(`https://mxmxk-helper.hf.space/yt?query=`+args[0])
    let a = api.data.result
		let _thumb = {}
		try { _thumb = { jpegThumbnail: (await conn.getFile(a.image)).data } }
		catch (e) { } 
		let caption = `*Title :* ${a.title}\n*Duration :* ${a.duration}\n*Description :* ${a.description}`
		await conn.sendMessage(m.chat, { [/^(?:-|--)doc$/i.test(args[1]) ? 'document' : 'video']: { url: a.download.video }, caption, fileName: `${a.title}.mp4`, mimetype: 'video/mp4', ..._thumb }, { quoted: m })
} else throw "Invalid URL"
}

handler.help = ['mp4'].map(v => 'yt' + v + ` <url>`)
handler.tags = ['downloader']
handler.command = /^yt(v|mp4)?$/i
export default handler