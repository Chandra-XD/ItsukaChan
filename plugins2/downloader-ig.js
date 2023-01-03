import fetch from 'node-fetch'
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `*Perintah ini untuk mengunduh postingan ig/reel/tv, bukan untuk highlight/story!*\n\nContoh:\n${usedPrefix + command} https://www.instagram.com/p/BmjK1KOD_UG/?utm_source=ig_web_copy_link`
    if (!args[0].match(/https:\/\/www.instagram.com\/(p|reel|tv)/gi)) throw `*Link salah! Perintah ini untuk mengunduh postingan ig/reel/tv, bukan untuk highlight/story!*\n\nContoh:\n${usedPrefix + command} https://www.instagram.com/p/BmjK1KOD_UG/?utm_source=ig_web_copy_link`
    let igh = await fetch(`https://api.lolhuman.xyz/api/instagram?apikey=${global.lolkey}&url=${args[0]}`)
    let ige = await igh.json()
    if (!ige) throw `Server error 404`
    m.reply('Sedang diproses...')
    conn.sendFile(m.chat, ige.result, 'instragram.mp4', ``, m)
}

handler.help = ['instagram'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.alias = ['ig', 'igdl', 'instagram', 'instagramdl']
handler.command = /^(ig(dl)?|instagram(dl)?)$/i

export default handler