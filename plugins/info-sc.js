import moment from 'moment-timezone'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
   let res = await fetch('https://api.github.com/repos/Chandra-XD/ItsukaChan')
   let json = await res.json()
   let txt = `*乂  B O T  -  S C R I P T*\n\n`
      txt += `	◦  *Name* : ${json.name}\n`
      txt += `	◦  *Visitor* : ${json.watchers_count}\n`
      txt += `	◦  *Size* : ${(json.size / 1024).toFixed(2)} MB\n`
      txt += `	◦  *Updated* : ${moment(json.updated_at).format('DD/MM/YY - HH:mm:ss')}\n`
      txt += `	◦  *Url* : ${json.html_url}\n\n`
      txt += `	   ${json.forks_count} Forks · ${json.stargazers_count} Stars · ${json.open_issues_count} Issues\n\n`
      txt += ``+ packname + ` ` + author +``
   await m.reply(txt)
}
handler.help = ['sc']
handler.tags = ['info']
handler.command = /^(sc|sourcecode)$/i
export default handler