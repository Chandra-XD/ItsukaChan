import { delay } from '@whiskeysockets/baileys'

let handler = async (m) => {
	const clear = (jid) => conn.chatModify({ delete: true, lastMessages: [m] }, jid)
	const mute = (jid) => delay(2000) && conn.chatModify({ mute: Infinity }, jid)
	
	let groups = Object.keys(await conn.groupFetchAllParticipating())
	
	return Promise.all(groups.map(clear)).then(() => (
		Promise.all(groups.map(mute))
	)).finally(() => ( 
		m.reply(`Successfully deleted messages in ${groups.length} groups`)
	))
}
handler.help = ['clearchat']
handler.tags = ['owner']
handler.command = /^(clearchat)$/i
handler.owner = true
export default handler