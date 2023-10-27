let handler = async (m, { conn, isAdmin, isBotAdmin }) => {
	if (m.quoted && m.quoted.fromMe) { // Pesan bot sendiri
	await conn.sendMessage(m.chat, { delete: m.quoted.vM.key })
	}

    if (m.isGroup && isBotAdmin) { // Bot admin
	await conn.sendMessage(m.chat, {
		delete: {
			...m.quoted.vM.key, participant: m.quoted.sender }
		})}
};
handler.alias = ["del", "delete"];
handler.command = /^del(ete)?$/i;
export default handler
