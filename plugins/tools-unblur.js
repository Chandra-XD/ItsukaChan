import jimp from "jimp"
import FormData from "form-data";
import { TMP } from '../lib/tempfile.js';

async function processing(urlPath, method) {
	return new Promise(async (resolve, reject) => {
		let Methods = ["enhance", "recolor", "dehaze"];
		Methods.includes(method) ? (method = method) : (method = Methods[0]);
		let buffer,
			Form = new FormData(),
			scheme = "https" + "://" + "inferenceengine" + ".vyro" + ".ai/" + method;
		Form.append("model_version", 1, {
			"Content-Transfer-Encoding": "binary",
			contentType: "multipart/form-data; charset=uttf-8",
		});
		Form.append("image", Buffer.from(urlPath), {
			filename: "enhance_image_body.jpg",
			contentType: "image/jpeg",
		});
		Form.submit(
			{
				url: scheme,
				host: "inferenceengine" + ".vyro" + ".ai",
				path: "/" + method,
				protocol: "https:",
				headers: {
					"User-Agent": "okhttp/4.9.3",
					Connection: "Keep-Alive",
					"Accept-Encoding": "gzip",
				},
			},
			function (err, res) {
				if (err) reject();
				let data = [];
				res
					.on("data", function (chunk, resp) {
						data.push(chunk);
					})
					.on("end", () => {
						resolve(Buffer.concat(data));
					});
				res.on("error", (e) => {
					reject();
				});
			}
		);
	});
}
let handler = async (m, { conn, usedPrefix, command }) => {
	switch (command) {
		case "unblur":
		case "hd":
		case "hdr":
		case "remini":
			{
				conn.enhancer = conn.enhancer ? conn.enhancer : {};
				if (m.sender in conn.enhancer)
					throw `Masih ada proses yang belum selesai, mohon tunggu beberapa saat...`
				let q = m.quoted ? m.quoted : m;
				let mime = (q.msg || q).mimetype || q.mediaType || "";
				if (!mime)
					throw `Fotonya?`
				if (!/image\/(jpe?g|png)/.test(mime))
					throw `Mime ${mime} tidak support`
				else conn.enhancer[m.sender] = true
				conn.sendMessage(m.chat, { react: { text: `🕑`, key: m.key }})
				let img = await q.download?.();
				let error;
				try {
					const This =  await upscale(img, 2) //await processing(img, "enhance")
					const tmp = await TMP(img)
					//conn.sendFile(m.chat, This, "", "_File will be deleted in 60 minutes_ " + tmp, m)
					//conn.sendFile(m.chat, This.image, "", "", m)
					conn.sendFile(m.chat, `https://fastrestapis.fasturl.cloud/aiimage/upscale?imageUrl=`+ tmp +`&resize=2`, "", "_File will be deleted in 60 minutes_ " + tmp, m)
				} catch (er) {
					error = true
				} finally {
					if (error) {
						m.reply("Proses gagal :(")
					}
					delete conn.enhancer[m.sender]
				}
			}
			break
		case "colorize":
			{
				conn.recolor = conn.recolor ? conn.recolor : {};
				if (m.sender in conn.recolor)
					throw `Masih ada proses yang belum selesai, mohon tunggu beberapa saat...`
				let q = m.quoted ? m.quoted : m;
				let mime = (q.msg || q).mimetype || q.mediaType || "";
				if (!mime)
					throw `Fotonya?`
				if (!/image\/(jpe?g|png)/.test(mime))
					throw `Mime ${mime} tidak support`
				else conn.recolor[m.sender] = true
				conn.sendMessage(m.chat, { react: { text: `🕑`, key: m.key }})
				let img = await q.download?.();
				let error;
				try {
					const This =  await upscale(img, 2) //await processing(img, "recolor")
					//const tmp = await TMP(This)
					//conn.sendFile(m.chat, This, "", "_File will be deleted in 60 minutes_ " + tmp, m)
					conn.sendFile(m.chat, This.image, "", "", m)
				} catch (er) {
					error = true
				} finally {
					if (error) {
						m.reply("Proses gagal :(")
					}
					delete conn.recolor[m.chat]
				}
			}
			break
		case "dehaze":
			{
				conn.hdr = conn.hdr ? conn.hdr : {};
				if (m.sender in conn.hdr)
					throw `Masih ada proses yang belum selesai, mohon tunggu beberapa saat...`
				let q = m.quoted ? m.quoted : m;
				let mime = (q.msg || q).mimetype || q.mediaType || "";
				if (!mime)
					throw `Fotonya?`
				if (!/image\/(jpe?g|png)/.test(mime))
					throw `Mime ${mime} tidak support`
				else conn.hdr[m.sender] = true
				conn.sendMessage(m.chat, { react: { text: `🕑`, key: m.key }})
				let img = await q.download?.();
				let error;
				try {
					const This =  await upscale(img, 2) //await processing(img, "dehaze")
					//const tmp = await TMP(This)
					//conn.sendFile(m.chat, This, "", "_File will be deleted in 60 minutes_ " + tmp, m)
					conn.sendFile(m.chat, This.image, "", "", m)
				} catch (er) {
					error = true
				} finally {
					if (error) {
						m.reply("Proses gagal :(")
					}
					delete conn.hdr[m.sender]
				}
			}
			break
	}
}
handler.command = handler.help = ["unblur", "hd", "remini", "colorize", "dehaze"]
handler.tags = ["tools"]
export default handler


async function upscale(buffer, size = 2, anime = false) {
  try {
    return await new Promise((resolve, reject) => {
      if(!buffer) return reject("undefined buffer input!");
      if(!Buffer.isBuffer(buffer)) return reject("invalid buffer input");
      if(!/(2|4|6|8|16)/.test(size.toString())) return reject("invalid upscale size!")
      jimp.read(Buffer.from(buffer)).then(image => {
        const { width, height } = image.bitmap;
        let newWidth = width * size;
        let newHeight = height * size;
        const form = new FormData();
        form.append("name", "upscale-" + Date.now())
        form.append("imageName", "upscale-" + Date.now())
        form.append("desiredHeight", newHeight.toString())
        form.append("desiredWidth", newWidth.toString())
        form.append("outputFormat", "png")
        form.append("compressionLevel", "none")
        form.append("anime", anime.toString())
        form.append("image_file", buffer, {
          filename: "upscale-" + Date.now() + ".png",
          contentType: 'image/png',
        })
        axios.post("https://api.upscalepics.com/upscale-to-size", form, {
          headers: {
            ...form.getHeaders(),
            origin: "https://upscalepics.com",
            referer: "https://upscalepics.com"
          }
        }).then(res => {
          const data = res.data;
          if(data.error) return reject("something error from upscaler api!");
          resolve({
            status: true,
            image: data.bgRemoved
          })
        }).catch(reject)
      }).catch(reject)
    })
  } catch (e) {
    return { status: false, message: e };
  }
}