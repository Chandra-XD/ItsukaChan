import axios from "axios"
import cheerio from "cheerio"
import { apivisit } from './kanghit.js'

async function wikipedia(querry) {
  try {
    const link = await axios.get(`https://id.m.wikipedia.org/wiki/${querry}`)
    const $ = cheerio.load(link.data)
    let judul = $('#firstHeading').text().trim()
    let thumb = $('#mw-content-text').find('div.mw-parser-output > div:nth-child(1) > table > tbody > tr:nth-child(2) > td > a > img').attr('src') || `//i.postimg.cc/Z5b1WDwD/1675949861324.jpg`
    let isi = []
    $('#mw-content-text > div.mw-parser-output').each(function (rayy, Ra) {
      let penjelasan = $(Ra).find('p').text().trim()
      isi.push(penjelasan)
    })
    for (let i of isi) {
      const data = {
        status: link.status,
        result: {
          judul: judul,
          thumb: 'https:' + thumb,
          isi: i
        }
      }
      return data
    }
  } catch (err) {
    var notFond = {
      status: link.status,
      Pesan: eror
    }
    return notFond
  }
}

let handler = async (m, { conn, text }) => {
if (!text) return m.reply('Query??')
await apivisit
wikipedia(`${text}`).then(res => {
    conn.sendFile(m.chat, res.result.thumb, 'wiki.png',`*Judul:* ${res.result.judul}\n\n*Penjelasan:*\n${res.result.isi}\n\n*© Wikipedia*`, m)
  }).catch(() => { m.reply('Maaf server tidak dapat menemukannya :(') })
}

handler.help = ['wikipedia'].map(v => v + ' <query>')
handler.tags = ['tools']
handler.command = /^(wiki|wikipedia)$/i
export default handler