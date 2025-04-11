let handler = async (m, { conn, args }) => {
  if (/^https?:\/\/.*youtu/i.test(args[0])) {
    conn.sendMessage(m.chat, { react: { text: `🕑`, key: m.key }})
  let api = (await axios.get("https://ochinpo-helper.hf.space/yt?query="+ args[0])).data 
  let x1 = api.result
  
  await conn.sendMessage(m.chat, { [/^(?:-|--)doc$/i.test(args[1]) ? 'document' : 'audio']: { url: x1.download.audio }, fileName: `${x1.title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m })
} else throw "Invalid URL"
}

handler.help = ['mp3'].map(v => 'yt' + v + ` <url>`)
handler.tags = ['downloader']
handler.command = /^yt(a|mp3)$/i
export default handler