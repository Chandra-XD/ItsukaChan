import axios from 'axios'
import cheerio from 'cheerio'

let handler = async (m, { conn, args, command }) => {
  if (!args[0]) throw 'Input URL'
  await conn.sendMessage(m.chat, { react: { text: `🕑`, key: m.key }})
  let results = await FbDownload(args[0])
  await conn.sendFile(m.chat, results.links["Download High Quality"] || results.links["Download Low Quality"], "", results.title, m);
}
handler.help = handler.alias = ['facebook'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^((facebook|fb)(dl)?)$/i
export default handler

async function FbDownload(vid_url) {
  try {
    const data = {
        url: vid_url
      },
      searchParams = new URLSearchParams();
    searchParams.append("url", data.url);
    const response = await fetch("https://facebook-video-downloader.fly.dev/app/main.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: searchParams.toString()
    });
    return await response.json();
  } catch (e) {
    return null;
  }
}

const baseURL = "https://fdownloader.net/id",
  apiURL = "https://v3.fdownloader.net/api/ajaxSearch?lang=en",
  facebookVideo = async url => {
    try {
      const {
        data
      } = await axios(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0"
        },
        data: new URLSearchParams(Object.entries({
          recaptchaToken: "",
          q: url,
          t: "media",
          lang: "en"
        }))
      }), script = cheerio.load(data)("body").find("script").text().trim(), k_token = script.split("k_token = ")[1].split(";")[0], k_exp = script.split("k_exp = ")[1].split(";")[0], {
        data: apiData
      } = await axios(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0"
        },
        data: new URLSearchParams(Object.entries({
          k_exp: k_exp,
          k_token: k_token,
          q: url,
          lang: "en",
          web: "fdownloader.net",
          v: "v2",
          w: ""
        }))
      }), $api = cheerio.load(apiData.data), result = [], duration = $api("div.clearfix > p").text().trim();
      return $api("div.tab__content").find("tbody > tr").each((index, element) => {
        const quality = $api(element).find("td.video-quality").text(),
          videoUrl = $api(element).find("td > a").attr("href");
        quality && videoUrl && result.push({
          quality: quality,
          url: videoUrl
        });
      }), {
        duration: duration,
        result: result
      };
    } catch (error) {
      throw console.log(error), error;
    }
  };
