import fetch from 'node-fetch'
let handler = async (m, { conn, args, command, usedPrefix }) => {
    if (!args[0]) throw m.reply('Putting *URL* Likee...')
    if (!args[0].includes("likee")) return m.reply(`_Invalid Url..._\nExample: ${usedPrefix + command} https://likee.video/@vicky_marpaung/video/7006676628722311449`)
    let res = await fetch(`https://api.akuari.my.id/downloader/likeedl?link=` + args[0])
    let json = await res.json()
    // if (!json.status) throw 'Error 404'
	 m.reply('Sedang diproses...')
	let buttons = [{buttonId: `${usedPrefix}get ${json.hasil.watermark}`, buttonText: { displayText: "️With Watermark" }, type: 1 }, {buttonId: `${usedPrefix}get ${json.hasil.no_watermark}`, buttonText: { displayText: "No Watermark" }, type: 1 }]
    conn.sendMessage(m.chat, { image: { url: `${json.hasil.thumbnail}` }, caption: `${json.hasil.title}`, footer: `_Select the button below_`, buttons }, { quoted: m })
	}
handler.help = ['likee'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(likee|likeedl)$/i
export default handler