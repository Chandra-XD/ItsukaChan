import axios from "axios"
import { apivisit } from './kanghit.js'

let handler = async (m, { conn }) => {
const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36';
const urlsc = "https://fmmods.com/download-center/mega.php"
const Proxy = (url)=>(url ? `https://translate.google.com/translate?sl=en&tl=fr&hl=en&u=${encodeURIComponent(url)}&client=webapp`: '')
const list = []
const d = (await axios.get(Proxy(urlsc), {
  headers: {
    'User-Agent': userAgent,
  },
})).data
        const $ = cheerio.load(d)
        $('div.su-button-center').each((i,element)=> {
        const link = $(element).find("a").attr("href");
            list.push({
                name: link.split('/')[7].replace('.', '_').replace('_apk', '.apk'),
                link: link
            });
        })
        const result = {}
        result.com_whatsapp = list && list[0] ? list[0] : undefined
        result.com_fmwhatsapp = list && list[1] ? list[1] : undefined
        result.com_gbwhatsapp = list && list[2] ? list[2] : undefined
        result.com_yowhatsapp = list && list[3] ? list[3] : undefined
        await conn.reply(m.chat, `Name: ${result.com_whatsapp.name}
Package: com.whatsapp
Link: ${result.com_whatsapp.link}

Name: ${result.com_fmwhatsapp.name}
Package: com.fmwhatsapp
Link: ${result.com_fmwhatsapp.link}

Name: ${result.com_gbwhatsapp.name}
Package: com.gbwhatsapp
Link: ${result.com_gbwhatsapp.link}

Name: ${result.com_yowhatsapp.name}
Package: com.yowhatsapp
Link: ${result.com_yowhatsapp.link}`, m)
        await apivisit
	}
handler.help = ['fmmods']
handler.tags = ['tools']
handler.command = /^(fmmods)$/i
export default handler