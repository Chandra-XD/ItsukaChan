import fetch from 'node-fetch'
let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) throw `contoh:\n ${usedPrefix + command} https://drive.google.com/file/d/1GyUKXd1WAlv1r2wYfnZ4YO7BtmI-rNbP/view?usp=drivesdk`
if (!args[0].includes("drive")) return m.reply(`Link Invalid`)
let rest = await fetch(`https://malesin.xyz/gdrive?url=${args[0]}&apikey=${global.malesin}`)
let res = await rest.json()
if (!res) throw 'Server error 404'
let { downloadUrl, fileName, fileSize, mimetype } = res
await m.reply('_In progress, please wait..._')
conn.sendMessage(m.chat, { document: { url: downloadUrl }, fileName: fileName, mimetype: mimetype }, { quoted: m })
}
handler.help = ["gdrive"].map(v => v + ' <url>')
handler.tags = ["downloader"]
handler.command = /^(gdrive)$/i
handler.disabled = false

export default handler