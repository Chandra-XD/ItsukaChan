import axios from 'axios'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, text }) => {
    if (!text) throw `Input *URL* Oploverz`
    let v = (await axios.get(API('skizo', '/api/oploverzdl', { url: text }, 'apikey', {
	responseType: 'arrayjson'
	}))).data
    let str = `Status: ${v.status}\nTitle: ${v.next}\n\n`
    let a = v.download
    for (let i = 0; i < a.length; i++) {
  	str += "*Format: " + a[i].format + '*\n'
 	let b = a[i].resolutions
  	for (let i = 0; i < b.length; i++) {
  		str += "*Resolutions: " + b[i].name + '*\n'
  		let c = b[i].servers
  		for (let i = 0; i < c.length; i++) {
  			str += "*Servers: " + c[i].name + '*\n'
  			str += "*Url:* " + c[i].link + '\n\n'
				}
			}
		}
    m.reply(str)
	// By Chandra XD
	// Follow bang
	// TikTok : @pnggilajacn
	// Github : https://github.com/Chandra-XD
	}
handler.help = ['oploverzdl'].map(v => v + ' <url>')
handler.tags = ['tools']
handler.command = /^(oploverzdl|oplodl)$/i
export default handler