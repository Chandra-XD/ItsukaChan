import axios from 'axios'

let handler = async (m, { conn, text, command }) => {
    if (!text) throw `Input *URL*`
	await conn.sendMessage(m.chat, { react: { text: `🕑`, key: m.key }})
let res = await axios.get("https://api.ammaricano.my.id/api/download/instagram?url="+text)
let hasil = res.data
if (hasil.success) {
    const { image, video } = hasil.result
    const media = [
        ...image.map(v => ({ url: v.url, type: 'image' })),
        ...video.map(v => ({ url: v.url, type: 'video' }))
    ]
    for (let item of media) {
        await conn.sendMessage(m.chat, { 
            [item.type]: { url: item.url }
        }, { quoted: m })
    }
} else {
    m.reply("Gagal mengambil data.")
}
}
handler.help = ['instagram'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.alias = ['ig', 'igdl', 'instagram', 'instagramdl']
handler.command = /^(ig(dl)?|instagram(dl)?)$/i
export default handler