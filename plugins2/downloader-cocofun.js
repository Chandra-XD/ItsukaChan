import fetch from 'node-fetch'
let handler = async (m, { conn, args, command, usedPrefix }) => {
    if (!args[0]) throw m.reply('Putting *URL* Cocofun...')
    if (!args[0].includes("cocofun")) return m.reply(`_Invalid Url..._\nExample: ${usedPrefix + command} http://www.icocofun.com/share/post/457616496291?lang=id&pkg=id&share_to=copy_link&m=c6d95b35bbbbf91ce3da574262388117&d=f7445b55ca8eb354536296f34f9c2a878ccc7704deeb8e2840eed6641f41c5d7&nt=4`)
    let res = await fetch(`https://api.akuari.my.id/downloader/cocofun?link=` + args[0])
    let json = await res.json()
    // if (!json.status) throw 'Error 404'
	 m.reply('Sedang diproses...')
	let buttons = [{buttonId: `${usedPrefix}get ${json.hasil.watermark}`, buttonText: { displayText: "️With Watermark" }, type: 1 }, {buttonId: `${usedPrefix}get ${json.hasil.no_watermark}`, buttonText: { displayText: "No Watermark" }, type: 1 }]
    conn.sendMessage(m.chat, { image: { url: `${json.hasil.thumbnail}` }, caption: `*Title :* ${json.hasil.caption}\n*Durasi :* ${json.hasil.duration} detik\n*Diputar :* ${json.hasil.play} kali\n*Like :* ${json.hasil.like} kali\n*Dishare :* ${json.hasil.share} kali`, footer: `_Select the button below_`, buttons }, { quoted: m })
	}
handler.help = ['cocofun'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(cocofun|cocofundl)$/i
export default handler