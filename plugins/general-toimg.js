import axios from 'axios'

let handler = async (m, { conn }) => {
  if (m.quoted && /sticker/.test(m.quoted.mtype) && !m.quoted.isAnimated) {
    let img = await m.quoted.download()
    await conn.sendMessage(m.chat, { image: img, jpegThumbnail: img }, { quoted: m })
  } else if (m.quoted && /sticker/.test(m.quoted.mtype) && m.quoted.isAnimated) {
  await conn.sendMessage(m.chat, { react: { text: `🕑`, key: m.key }})
  let file = (await m.quoted.download()).toString('base64')
  let link = (await axios.post("https://mxmxk-helper.hf.space/webp2mp4", { file, raw: true })).data
    await conn.sendMessage(m.chat, {
                video: { url: link },
                gifPlayback: true,
                gifAttribution: Math.floor(Math.random() * 2) + 1
            }, {
                quoted: m
            })
  } else throw 'Reply a sticker!'
}
handler.help = ['toimg']
handler.tags = ['general']
handler.alias = ['toimg', 'togif', 'tovid', 'tovideo']
handler.command = /^to(img|gif|vid|video)$/i
export default handler