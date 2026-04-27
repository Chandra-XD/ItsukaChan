import axios from 'axios'

let handler = async (m, { conn, text, command }) => {
if (!text) throw 'Nothing url'
if (!/^https?:\/\//.test(text)) throw 'Param *URL* must be starts with http:// or https://'

const { data } = await axios.post('https://gcp.imagy.app/screenshot/createscreenshot', {
        url: text,
        browserWidth: 1280,
        browserHeight: 720,
        fullPage: true,
        deviceScaleFactor: 1,
        format: 'png'
    }, {
        headers: {
            'content-type': 'application/json',
            referer: 'https://imagy.app/full-page-screenshot-taker/',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
        }
    })
    
await conn.sendMessage(m.chat, { image: { url: data.fileUrl}}, { quoted: m})
}
handler.help = ['ssweb']
handler.tags = ['internet']
handler.command = /^ss(web|f)?$/i
export default handler