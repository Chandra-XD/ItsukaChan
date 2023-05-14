import axios from 'axios'
let handler = m => m

handler.before = async (m) => {
//    if (!m.isGroup) return
    let chat = db.data.chats[m.chat]
    let seting = db.data.settings
    if (chat.premnsfw && !chat.isBanned && !m.isCommand) {
        if (/^.*false|disable|(turn)?off|0/i.test(m.text)) return
        if (!m.text) return
        let scs = ['Kata² yang bagus Tetapi simi tidak memahaminya..', 'Simi tidak memahami kata2 itu 😖', 'Simi tidak memahami kamu :/', 'Kamu ngomong apa sihh..\nSimi gapaham nih :"(', '?¿?¿?¿?¿?¿?¿']
        let res = await fetchJson(`https://pnggilajacn.my.id/api/other/simi2?query=$${m.text}`)
        if (res.result == 'Aku tidak mengerti apa yang kamu katakan.Tolong ajari aku.' || res.result == '') return m.reply(scs[Math.floor(Math.random() * scs.length)])
         await m.reply(res.result)
        return !0
    }
    return !0
}

export default handler

async function fetchJson(url, options) {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}