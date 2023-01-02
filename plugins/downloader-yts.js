import yts from 'yt-search'
let handler = async (m, { text, conn }) => {
 if (!text) throw 'Cari apa?'
 let search = await yts(text)
 let sections = []
 for (let i of search.all) {
 var list = {title : ``,
rows: [
{
title : `${i.title}`,
rowId : `.play ${i.title}`,
description: `Uploaded ${i.ago}, ${i.views} views`
},
]
}
sections.push(list)
}
return conn.sendMessage(m.chat, { text: `Result from: ${text}`, footer: '', title: '', buttonText: "Continue", sections }, { quoted: m })
}
handler.help = ['', 'earch'].map(v => 'yts' + v + ' <query>')
handler.tags = ['tools']
handler.command = /^yts(earch)?$/i
handler.limit = false
export default handler