import { WAMessageStubType } from '@whiskeysockets/baileys';

export async function before(m) {
	if (!m.messageStubType || !m.isGroup) return;
	const edtr = `@${m.sender.split`@`[0]}`
	const chat = db.data.chats[m.chat]
    if (!chat.isBanned) {
	if (m.messageStubType == 21) {
		await this.sendMessage(m.chat, { text: `${edtr} mengubah Subject Grup menjadi :\n*${m.messageStubParameters[0]}*`, mentions: [m.sender] })
	} else if (m.messageStubType == 22) {
		await this.sendMessage(m.chat, { text: `${edtr} telah mengubah icon grup.`, mentions: [m.sender] })
	} else if (m.messageStubType == 1 || m.messageStubType == 23 || m.messageStubType == 132) {
		await this.sendMessage(m.chat, { text: `${edtr} *mereset* link grup!\n\n`, mentions: [m.sender] })
	} else if (m.messageStubType == 24) {
		await this.sendMessage(m.chat, { text: `${edtr} mengubah deskripsi grup.\n\n${m.messageStubParameters[0]}`, mentions: [m.sender] })
	} else if (m.messageStubType == 25) {
		await this.sendMessage(m.chat, { text: `${edtr} telah mengatur agar *${m.messageStubParameters[0] == 'on' ? 'hanya admin' : 'semua peserta'}* yang dapat mengedit info grup.`, mentions: [m.sender] })
	} else if (m.messageStubType == 26) {
		await this.sendMessage(m.chat, { text: `${edtr} telah *${m.messageStubParameters[0] == 'on' ? 'menutup' : 'membuka'}* grup!\nSekarang ${m.messageStubParameters[0] == 'on' ? 'hanya admin yang' : 'semua peserta'} dapat mengirim pesan.`, mentions: [m.sender] })
	} else if (m.messageStubType == 29) {
		await this.sendMessage(m.chat, { text: `${edtr} telah menjadikan @${m.messageStubParameters[0].split`@`[0]} sebagai admin.`, mentions: [`${m.sender}`,`${m.messageStubParameters[0]}`] })
	} else if (m.messageStubType == 30) {
		await this.sendMessage(m.chat, { text: `${edtr} telah memberhentikan @${m.messageStubParameters[0].split`@`[0]} dari admin.`, mentions: [`${m.sender}`,`${m.messageStubParameters[0]}`] })
	} else if (m.messageStubType == 72) {
		await this.sendMessage(m.chat, { text: `${edtr} mengubah durasi pesan sementara menjadi *@${m.messageStubParameters[0]}*`, mentions: [m.sender] })
	} else if (m.messageStubType == 123) {
		await this.sendMessage(m.chat, { text: `${edtr} *menonaktifkan* pesan sementara.`, mentions: [m.sender] })
	} else {
		console.log({
			messageStubType: m.messageStubType,
			messageStubParameters: m.messageStubParameters,
			type: WAMessageStubType[m.messageStubType],
		});
	}
	}
return !0
}

export const disabled = false