import { Sticker } from 'wa-sticker-formatter'
import axios from 'axios'

let d = new Date
let date = d.toLocaleDateString('id', { day: 'numeric', month: 'numeric', year: 'numeric' })
let depan = `Created by ItsukaBot-Md\n\nOwner : Chandra 3.07\nPanther collab : Rico2378, Skigem Pack`
let blakng = date

let handler = async (m, { conn, args }) => {
    let query = `Input *text*`
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw query
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
   try {
   const obj = {
      "type": "quote",
      "format": "png",
      "backgroundColor": "#37424c",
      "width": 512,
      "height": 768,
      "scale": 2,
      "messages": [{
         "entities": [],
         "avatar": true,
         "from": {
            "id": 1,
            "name": await conn.getName(who),
            "photo": {
               "url": await conn.profilePictureUrl(who, 'image').catch(_ => 'https://github.com/Chandra-XD/ItsukaChan/raw/main/src/avatar_contact.png')
            }
         },
         "text": text,
         "replyMessage": {}
      }]
   }
   const json = await axios.post('https://quote-api.team-skizo.repl.co/generate', obj, {
      headers: {
         'Content-Type': 'application/json'
      }
   })
   const buffer = Buffer.from(json.data.result.image, 'base64')
    let stiker = await (new Sticker(buffer, { type: 'full', pack: depan, author: blakng })).toMessage()
	if (stiker) return conn.sendMessage(m.chat, stiker, { quoted: m })
	} catch (e) {
	throw e
	}
}

handler.help = ['qc'].map(v => v + ' <text>')
handler.tags = ['general']
handler.command = /^(qc|quotly)$/i
export default handler