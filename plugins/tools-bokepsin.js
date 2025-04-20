import * as cheerio from 'cheerio'
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    usedPrefix,
    text,
    command
}) => {

    let lister = [
        "search",
        "stream"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply(`*Example:*\n`+ usedPrefix + command +` search|indo\n\n*Pilih type yg ada*\n` + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {
        if (feature == "search") {
            if (!inputs) return m.reply(`Input Query\nExample: `+ usedPrefix + command +` search|indo`)
            try {
                let res = await searchBokepsin(inputs)
                let teks = res.map((item, index) => {
                    return `Title: ${item.title}
Link: ${item.videoUrl}
Date: ${item.views}
Story: ${item.duration}`
                }).filter(v => v).join("\n________________________\n")
                await m.reply(teks)
            } catch (e) {
                throw e
            }
        }

        if (feature == "stream") {
            if (!inputs) return m.reply(`Input Url`)
            try {
                let item = await streamBokepsin(inputs)
                await m.reply(`link: ${item}`)
            } catch (e) {
                throw e
            }
        }
    }
}
handler.help = ["bokepsin"]
handler.tags = ["tools"]
handler.command = /^(bokepsin)$/i
export default handler

/* New Line */
async function searchBokepsin(q) {
  const url = 'https://bokepsin.tube/search/' + q;
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  const results = $('.video-block').map((index, element) => ({
    title: $(element).find('.title').text(),
    imageUrl: $(element).find('.video-img').attr('data-src'),
    videoUrl: $(element).find('.thumb').attr('href'),
    views: $(element).find('.views-number').text().trim(),
    duration: $(element).find('.duration').text().trim()
  })).get();
  return results;
}

async function streamBokepsin(url) {
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  const embedUrl = $('meta[itemprop="embedURL"]').attr('content');
  return embedUrl.startsWith('//') ? `https:${embedUrl}` : embedUrl;
}
