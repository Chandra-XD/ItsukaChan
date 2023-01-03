import fetch from 'node-fetch'
let handler = async (m, { conn, command, args, usedPrefix }) => {
    try {
    if (!args[0]) return m.reply('Putting *URL* Facebook..') 
    if (!args[0].match(/fb.watch|facebook.com/gi)) throw `Url salah`
    let res = await fetch(`https://api.violetics.pw/api/downloader/facebook?apikey=${global.viokey}&url=` + args[0])
    let json = await res.json()
    let url = `${json.result.hd.url || json.result.sd.url}`
    await m.reply('Sedang diproses...')
    await conn.sendFile(m.chat, url, 'fb.mp4', ``, m)
	} catch {
	if (!args[0]) return m.reply('Putting *URL* Facebook..')
	if (!args[0].match(/fb.watch|facebook.com/gi)) throw `Url salah`
	let res2 = await fetch(`https://api.akuari.my.id/downloader/fbdl?link=` + args[0])
	if (!res2) throw `Error 404`
	let json2 = await res2.json()
    let url2 = json2.url.url
	m.reply('Sedang diproses...')
	await conn.sendFile(m.chat, url2, 'fb.mp4', ``, m) 
	}
	}
handler.help = ['fb2'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^f((b|acebook|)(dl|download)?(er)?(2)?)$/i
export default handler