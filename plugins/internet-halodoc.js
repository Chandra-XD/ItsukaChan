import * as cheerio from 'cheerio'
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    text,
    command
}) => {

    let lister = [
        "search",
        "detail"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.halodoc search|vaksin\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query\nExample: .halodoc search|vaksin")
            await m.reply('Sedang diproses...')
            try {
                let res = await searchHalodoc(inputs)
                let teks = res.map((item, index) => {
                    return `Title: ${item.title}
Article Link: ${item.articleLink}
Health Link: ${item.healthLink}
Health Title: ${item.healthTitle}
Description: ${item.description}
  `
                }).filter(v => v).join("\n________________________\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(`Error`)
            }
        }

        if (feature == "detail") {
            if (!inputs) return m.reply("Input link\nExample: .halodoc detail | link")
            await m.reply('Sedang diproses...')
            try {
                let item = await getDetails(inputs)
                let cap = `Title: ${item.title}
Content: ${item.content}
Times: ${item.times}
Author: ${item.author}
Link: ${item.link}
Image: ${item.image}
`
                await conn.sendFile(m.chat, item.image || `https://upload.wikimedia.org/wikipedia/commons/f/f3/Halodoc-logo-red.jpg`, "", cap, m)
                
            } catch (e) {
                await m.reply(`Error`)
            }
        }
    }
}
handler.help = ["halodoc"]
handler.tags = ["internet"]
handler.command = /^(halodoc)$/i
export default handler

/* New Line */
async function searchHalodoc(query) {
  const url = `https://www.halodoc.com/artikel/search/${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const articles = $('magneto-card').map((index, element) => ({
      title: $(element).find('header a').text(),
      articleLink: 'https://www.halodoc.com' + $(element).find('header a').attr('href'),
      imageSrc: $(element).find('magneto-image-mapper img').attr('src'),
      healthLink: 'https://www.halodoc.com' + $(element).find('.tag-container a').attr('href'),
      healthTitle: $(element).find('.tag-container a').text(),
      description: $(element).find('.description').text(),
    })).get();

    return articles;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function getDetails(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    return {
      title: $('div.wrapper div.item').text(),
      content: $('div.article-page__article-body').text(),
      times: $('div.article-page__article-subheadline span.article-page__reading-time').text(),
      author: $('div.article-page__reviewer a').text(),
      link: $('meta[property="og:url"]').attr('content') || '',
      image: $('meta[property="og:image"]').attr('content') || ''
    };
  } catch (error) {
    throw new Error(error);
  }
}
