let handler = async (m, { conn, text, command }) => {
if (!text) throw 'Nothing url'
if (!/^https?:\/\//.test(text)) throw 'Param *URL* must be starts with http:// or https://'
try {
var res = `https://image.thum.io/get/fullpage/` + text
await conn.sendFile(m.chat, res, "", "*Request:* " + m.name, m)
 } catch (e) {
 throw `Error`
 }
}
handler.help = ['ssweb']
handler.tags = ['internet']
handler.command = /^ss(web|f)?$/i
export default handler