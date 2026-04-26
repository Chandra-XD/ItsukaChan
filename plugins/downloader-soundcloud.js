import axios from 'axios'

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw 'Url?'
    let scRegex = /https?:\/\/(?:on\.)?soundcloud\.com\/[^\s?]+/
    let url = args[0].match(scRegex)?.[0]
    if (!url) throw 'Link SoundCloud tidak valid!'
    await conn.sendMessage(m.chat, { react: { text: '🕑', key: m.key }})
    try {
        let response = await axios.get(`https://chocomilk.amira.us.kg/v1/download/soundcloud?url=${url}`)
        let res = response.data
        if (res.success && res.data) {
            const { media } = res.data
            const downloadUrl = media.url
            let audioRes = await axios.get(downloadUrl, { 
                responseType: 'arraybuffer',
                headers: { 'User-Agent': 'Mozilla/5.0' }
            })
            let buffer = Buffer.from(audioRes.data, 'binary')
            await conn.sendMessage(m.chat, { 
                audio: buffer, 
                mimetype: 'audio/mpeg',
                ptt: false
            }, { quoted: m })
        } else {
            m.reply('Gagal mengambil data. Pastikan link bisa diakses.')
        }
    } catch (e) {
        console.error(e)
        m.reply('Terjadi kesalahan pada server API atau koneksi.')
    }
}

handler.help = ['soundcloud <url>']
handler.tags = ['downloader']
handler.command = /^(soundcloud|scdl)$/i

export default handler