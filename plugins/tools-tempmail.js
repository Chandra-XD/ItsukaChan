import { TempMail } from 'tempmail.lol'
import { apivisit } from './kanghit.js'
const tempmail = new TempMail()

let handler = async (m, { conn, text, args, command }) => {
	switch (command) {
	case "tmpmail": 
	case "tempmail": {
    let api = tempmail.createInbox().then(inbox => {
    conn.reply(m.chat, `*Email :*\n${inbox.address}\n\n\n*Token :* \n${inbox.token}`, m)
})
    await apivisit }
    break

    case "tmpmailcek":
    case "cekmail": {
    if (!args[0]) throw `Input *Token Email*`
    let emails = tempmail.checkInbox(args[0]).then((emails) => {
    if(!emails) throw `Kotak masuk kedaluwarsa karena "email" tidak ditentukan...`    
    for(let i = 0; i < emails.length; i++) {
        conn.reply(m.chat, `Email ${i}: ${JSON.stringify(emails[i])}`, m)
    }
})
    await apivisit }
    break
	// By Chandra XD
	// Follow bang
	// TikTok : @pnggilajacn
	// Github : https://github.com/Chandra-XD
	} }
handler.help = ["tmpmail", "tmpmailcek"]
handler.tags = ["tools"]
handler.command = handler.alias = ["tmpmail", "tempmail", "tmpmailcek", "cekmail"]
export default handler

// https://github.com/tempmail-lol/api-javascript