export async function before(m) { 
    let chat = db.data.chats[m.chat]
    if (chat.autodown === true) {
    
    let url = m.text.split(/\n| /i)[0]

    if (/^.*tiktok/i.test(m.text)) {
    let { data, code, msg } = await (await axios.post('https://www.tikwm.com/api', {}, {
		params: { url, count: 12, cursor: 0, web: 1, hd: 1 }
	})).data
	if (code !== 0) throw msg
	await conn.sendMessage(m.chat, { react: { text: `🕑`, key: m.key }})
	if (data?.images?.length) {
		for (let x = 0; x < data.images.length; x++) {
			await conn.sendMessage(m.chat, { image: { url: data.images[x] }}, { quoted: m })
		}
	} else {
	// let a = `https://www.tikwm.com${data.hdplay}`
	let b = `https://www.tikwm.com${data.play}`
    await conn.sendMessage(m.chat, { video: { url: b }}, { quoted: m })
    } }
    
    if (/^.*(fb.watch|facebook.com)/i.test(m.text)) {
    conn.sendMessage(m.chat, { react: { text: `🕑`, key: m.key }})
      let results = await FbDownload(url)
  await conn.sendFile(m.chat, results.links["Download High Quality"] || results.links["Download Low Quality"], "", results.title, m)
    }

    if (/^.*instagram.com\/(p|reel|tv)/i.test(m.text)) {
    conn.sendMessage(m.chat, { react: { text: `🕑`, key: m.key }})
    let resp = await axios.get('https://indown.io/')
	let $ = cheerio.load(resp.data)
	
	let form = {}
	$('#downloadForm input').each((idx, el) => form[$(el).attr('name')] = $(el).attr('value'))
	form['link'] = url
	
	let cookie = resp.headers['set-cookie']
	let response = await axios.post('https://indown.io/download', form, { headers: { cookie } })
	if (response.status !== 200) throw response.statusText
	
	$ = cheerio.load(response.data)
	
	let v = $('#result a').get().map(el => $(el).attr('href'))
	
    for (let x = 0; x < v.length; x++) {
		conn.sendFile(m.chat, v[x], '', null, m)
	}
    }

    if (/^.*(twitter|x)/i.test(m.text)) {
    conn.sendMessage(m.chat, { react: { text: `🕑`, key: m.key }})
    let html = await (await axios.get("https://twtube.app/en/download?url="+ url)).data
    let $ = cheerio.load(html)
    let k = $('.square-box-img').get().map(el => 
    $(el).find('img').attr('src') || $(el).find('video').attr('src'))
    for (let x = 0; x < k.length; x++) {
		conn.sendFile(m.chat, k[x], '', null, m)
    } }

    if (/^https?:\/\/.*youtu/i.test(m.text)) {
    conn.sendMessage(m.chat, { react: { text: `🕑`, key: m.key }})
        let api = (await axios.get("https://mxmxk-helper.hf.space/yt?query="+ url)).data 
		let x1 = api.result
		let _thumb = {}
		try { _thumb = { jpegThumbnail: (await conn.getFile(x1.image)).data } }
		catch (e) { }
		let vd = await conn.sendMessage(m.chat, { document: { url: x1.download.video }, fileName: `${x1.title}.mp4`, mimetype: 'video/mp4', ..._thumb }, { quoted: m })
		await conn.sendMessage(m.chat, { audio: { url: x1.download.audio }, fileName: `${x1.title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: vd })
		}
		}
	return !0
}

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