import axios from "axios"
let handler = m => m

handler.before = async (m) => {
//    if (!m.isGroup) return
    let chat = db.data.chats[m.chat]
    let seting = db.data.settings
    if (chat.premnsfw && !chat.isBanned && !m.isCommand) {
        if (/^.*false|disable|(turn)?off|0/i.test(m.text)) return
        if (!m.text) return
        var res = await (await axios.get(`https://simsimi.fun/api/v2/?mode=talk&lang=id&message=`+m.text+`&filter=true`, {
               headers: {
                  'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.4495.540 Mobile Safari/537.36'
               }
            })).data
         await m.reply(res.success)
        return !0
    }
    return !0
}

    
export default handler