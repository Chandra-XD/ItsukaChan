let handler = async (m, { conn, usedPrefix }) => {
let judul = `I only help WhatsApp users in downloading things like
YouTube, TikTok, Instagram and others.

For its features 
${usedPrefix}yts
${usedPrefix}play
${usedPrefix}ytmp3
${usedPrefix}ytmp4
${usedPrefix}facebook
${usedPrefix}instagram
${usedPrefix}mediafire
${usedPrefix}zippyshare
${usedPrefix}tiktok
${usedPrefix}twitter
${usedPrefix}cocofun
${usedPrefix}likee
${usedPrefix}gdrive
${usedPrefix}gitclone
${usedPrefix}telesticker
${usedPrefix}sfile
${usedPrefix}pinterest

To make stickers type
${usedPrefix}s
${usedPrefix}sticker
${usedPrefix}wm`
conn.fakeReply(m.chat, `${judul}`, '0@s.whatsapp.net', 'Hey bro, i\'m not a robot!' ,'120363040878906021@g.us')
}
handler.help = ['menu']
handler.tags = ['main']
handler.command = /^(allmenu|menu|help|\?)$/i

export default handler