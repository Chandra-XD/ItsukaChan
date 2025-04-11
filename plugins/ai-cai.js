import axios from 'axios'

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (m.isGroup) return m.reply("Hanya bisa di private chat!!")
    conn.cai = conn.cai ? conn.cai : {}
    
    let lister = [
        "start",
        "stop"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split(" ")
    if (!lister.includes(feature)) return m.reply("*Example:*\n" + usedPrefix + command + " start\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))
    if (lister.includes(feature)) {
    
    if (feature == "start") {
		try {
			let api = (await axios(`https://cruxx-c-ai.hf.space/api?characterId=U3dJdreV9rrvUiAnILMauI-oNH838a8E_kEYfOFPalE&text=introduce+yourself`, {
               headers: {
                  'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.4495.540 Mobile Safari/537.36'
               }
            })).data
      if (api.error) throw api.message
            let anu = api.result
			await conn.sendMessage(m.chat, { text: `_*${anu.srcCharacterName}*_\n\n${anu.text}`, mentions: [m.sender] }, { quoted: m })
			conn.cai[m.sender] = anu.sessionId
		} catch (e) {
			m.reply(e)
		}
	}
		
		if (feature == "stop") {
            if (!conn.cai[m.sender]) return m.reply("Tidak ada sessions cai")
            try {
                delete conn.cai[m.sender]
                await m.reply("Sukses menghapus sessions")
            } catch (e) {
                m.reply(e)
            }
        }
    }
}
handler.help = ["hutao"]
handler.tags = ["ai"]
handler.command = /^(hutao)$/i
export default handler