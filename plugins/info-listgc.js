let handler = async (m, { conn, isOwner }) => {
	let groups = Object.values(await conn.groupFetchAllParticipating()),
		txt = `*GROUPS LIST*\n\n*Total:* ${groups.length}\n\n`
	for (let i = 0; i < groups.length; i++) {
		txt += `*• Subject:* ${groups[i].subject}\n`
			+ `*• ID:* ${groups[i].id}\n`
			+ `${isOwner ? `*• Participants:* ${groups[i].participants.length}\n` : ''}`
			+ `${isOwner ? `*• isBotAdmin:* ${!!groups[i].participants.find(v => v.id == conn.user.jid && v.admin)}\n` : ''}\n`
	}
	m.reply(txt.trim())
}
handler.help = ['listgc']
handler.tags = ['info']
handler.command = /^listgc|grouplist$/i
export default handler