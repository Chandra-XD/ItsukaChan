import axios from 'axios'

export async function before(m) {
     if (m.isGroup) return
	if (global.db.data.users[m.sender].banned) return
	    this.cai = this.cai ? this.cai : {}
	try {
    if (m.sender in this.cai) {
	let sessionId = this.cai[m.sender]
		let api = (await axios(`https://cruxx-c-ai.hf.space/api?characterId=U3dJdreV9rrvUiAnILMauI-oNH838a8E_kEYfOFPalE&text=${m.text}&sessionId=${sessionId}`, {
               headers: {
                  'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.4495.540 Mobile Safari/537.36'
               }
            })).data
      if (api.error) throw `${api.message}\n\nSilahkan keluar dari session c.ai`
		let anu = api.result
			await this.sendMessage(m.chat, { text: `_*${anu.srcCharacterName}*_\n\n${anu.text}`, mentions: [m.sender] }, { quoted: m }) }
	} catch (e) {
		m.reply(e)
	}
	return !0
}