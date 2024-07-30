let handler = async (m, { conn, args }) => {
  if (/^https?:\/\/.*youtu/i.test(args[0])) {
    conn.sendMessage(m.chat, { react: { text: `🕑`, key: m.key }})
        let api = (await axios.get("https://mxmxk-helper.hf.space/yt?query="+ args[0])).data 
		let x1 = api.result
		let _thumb = {}
		try { _thumb = { jpegThumbnail: (await conn.getFile(x1.image)).data } }
		catch (e) { }
		let tek = `Title : ${x1.title}\nDescription : ${x1.description}`
		let vd = await conn.reply(m.chat, tek, m)
		await conn.sendMessage(m.chat, { [/^(?:-|--)doc$/i.test(args[1]) ? 'document' : 'video']: { url: x1.download.video }, fileName: `${x1.title}.mp4`, mimetype: 'video/mp4', ..._thumb }, { quoted: vd })
} else throw "Invalid URL"
}

handler.help = ['mp4'].map(v => 'yt' + v + ` <url>`)
handler.tags = ['downloader']
handler.command = /^yt(v|mp4)?$/i
export default handler