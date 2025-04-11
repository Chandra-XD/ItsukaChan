import axios from 'axios'
import cheerio from 'cheerio'

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw m.reply('Putting *URL* Cocofun...')
    if (!args[0].includes("cocofun")) return m.reply(`_Invalid Url..._`)
    let res = await cocofun(args[0])
  await conn.sendMessage(m.chat, { react: { text: `🕑`, key: m.key }})
    await conn.sendMessage(m.chat, { video: { url: res?.result?.no_watermark }, caption: res?.result?.caption}, { quoted: m })
  // By Chandra XD
  // Follow bang
  // TikTok : @pnggilajacn
  // Github : https://github.com/Chandra-XD
  }
handler.help = ['cocofun'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(cocofun|cocofundl)$/i
export default handler


async function cocofun(url) {
  return new Promise((resolve, reject) => {
    axios({url, method: "get",
      headers: {
        "Cookie": "client_id=1a5afdcd-5574-4cfd-b43b-b30ad14c230e",
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
      }
    }).then(data => {
      $ = cheerio.load(data.data)
      let json
      const res = $('script#appState').get()
      for(let i of res){
        if(i.children && i.children[0] && i.children[0].data){
          ress = i.children[0].data.split('window.APP_INITIAL_STATE=')[1]
          json = JSON.parse(ress)
        }
        const result = {
          topic: json.share.post.post.content ? json.share.post.post.content : json.share.post.post.topic.topic,
          caption: $("meta[property='og:description']").attr('content'),
          play: json.share.post.post.playCount,
          like: json.share.post.post.likes,
          share: json.share.post.post.share,
          duration: json.share.post.post.videos[json.share.post.post.imgs[0].id].dur,
          thumbnail: json.share.post.post.videos[json.share.post.post.imgs[0].id].coverUrls[0],
          watermark: json.share.post.post.videos[json.share.post.post.imgs[0].id].urlwm,
          no_watermark: json.share.post.post.videos[json.share.post.post.imgs[0].id].url
        }
        resolve(result)
      }
    }).catch(reject)
  })
}