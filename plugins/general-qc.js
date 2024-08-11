import { Sticker } from 'wa-sticker-formatter'
import axios from 'axios'

let d = new Date
let date = d.toLocaleDateString('id', { day: 'numeric', month: 'numeric', year: 'numeric' })
let depan = `Created by ItsukaBot-Md\n\nOwner : Chandra 3.07\nPanther collab : Rico2378, Skigem Pack`
let blakng = date

let handler = async (m, { conn, text, args }) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let name = await conn.getName(who)
    let reply
    if (text && m.quoted) {
        if (m.quoted.text || m.quoted.sender) {
            reply = {
                "name": await conn.getName(m.quoted.sender),
                "text": m.quoted.text || '',
                "chatId": m.chat.split('@')[0],
            };
        }
    } else if (text && !m.quoted) {
        reply = {};
    } else if (!text && m.quoted) {
        if (m.quoted.text) {
            text = m.quoted.text || '';
        }
        reply = {};
    } else {
        throw "Input teks atau reply teks yang ingin dijadikan quote!";
    }
    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://github.com/Chandra-XD/ItsukaChan/raw/main/src/avatar_contact.png')
   try {
   const obj = {
            type: "quote",
            format: "png",
            backgroundColor: "#1b1429",
            width: 512,
            height: 768,
            scale: 2,
            messages: [{
                entities: [],
                avatar: true,
                from: {
                    id: 1,
                    name: name,
                    photo: {
                        url: pp
                    }
                },
                text: text,
                replyMessage: reply
            }]
        };
   const json = await axios.post('https://mxmxk-quote-api.hf.space/generate', obj, {
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

handler.help = ['qc']
handler.tags = ['general']
handler.command = /^(qc|quotly)$/i
export default handler