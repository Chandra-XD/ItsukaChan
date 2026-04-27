import axios from "axios"
import pdfkit from 'pdfkit';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import { fileTypeFromBuffer } from 'file-type';

let handler = async(m, { conn, args }) => {
if (isNaN(args[0])) {
let [query, page] = args.join(' ').split('|')
page = +page || 1
let { data } = await axios.get(`https://same.yui.pw/api/v6/search/${query}/popular/${page}`).catch(e => e.response)
if (!data.result?.[0] || !data || page > data.num_pages) throw `Query "${query}" Not Found`
let tekss = data.result.map(x => { return `ID: ${x.id}\nTitle: ${x.title.english || x.title.pretty || x.title.japanese}\nLang: ${x.lang}\nPages: ${x.num_pages}`}).filter(x => x).join('\n\n')
await m.reply(tekss)
} else {
try {
let data = await nhentaiScraper(args[0])
let pages = []
let thumb = `https://t.nhentai.net/galleries/${data.media_id}/cover.jpg`
data.images.pages.map((v, i) => {
			let ext = new URL(v.t).pathname.split('.')[1]
			pages.push(`https://i.nhentai.net/galleries/${data.media_id}/${i + 1}.${ext}`)
		})
		let img = await generateMangaPdf(pages, "nh.pdf")
		let fl = await TMP(img)
		let teks = `✅ *PDF Berhasil Dibuat!*\n\n`+
		`*English :* ${data.title.english}\n\n*Japanese :* ${data.title.japanese}\n\n`+
		`Silahkan download melalui link di bawah ini:\n` +
		`${fl}\n\n` +
		`_Link akan hangus dalam 60 menit._`;
        await conn.reply(m.chat, teks, m)
        fs.unlinkSync("./tmp/nh.pdf")
} catch (e) {
await m.reply("Error :\n\n"+ e)
}
}
}
handler.command = /^(nhentai|nhpdf)$/i
handler.tags = ['tools']
handler.help = ['nhentai']
export default handler 

async function nhentaiScraper(id) {
	let uri = id ? `https://cin.guru/v/${+id}/` : 'https://cin.guru/'
	let html = (await axios.get(uri)).data
	return JSON.parse(html.split('<script id="__NEXT_DATA__" type="application/json">')[1].split('</script>')[0]).props.pageProps.data
}

async function generateMangaPdf(imageUrls, outputName) {
    // 1. Pastikan nama file ada
    if (!outputName) outputName = `manga_${Date.now()}.pdf`;
    const outputPath = path.join("./tmp", outputName);

    // 2. Pastikan folder tmp ada
    if (!fs.existsSync('./tmp')) fs.mkdirSync('./tmp');

    return new Promise(async (resolve, reject) => {
        let pdfDoc = null;
        let writeStream = null;

        try {
            for (const url of imageUrls) {
                const response = await axios.get(url, { responseType: 'arraybuffer' });
                const imageBuffer = Buffer.from(response.data);
                
                // Minta bantuan pushImageToPdf
                pdfDoc = await pushImageToPdf(pdfDoc, imageBuffer, outputName);

                // FIX: pipe harus dipasang tepat SETELAH pdfDoc pertama kali dibuat
                if (pdfDoc && !writeStream) {
                    writeStream = fs.createWriteStream(outputPath);
                    pdfDoc.pipe(writeStream);
                }
            }

            if (pdfDoc && writeStream) {
                pdfDoc.end();
                writeStream.on('finish', () => {
                    console.log("PDF Selesai dibuat sepenuhnya.");
                    resolve(outputPath);
                });
                writeStream.on('error', (err) => reject(err));
            } else {
                reject("Gagal membuat PDF: pdfDoc atau writeStream kosong");
            }
        } catch (e) {
            reject(e);
        }
    });
}

export async function pushImageToPdf(pdf, imageFile, pdfName) {
  const image = sharp(imageFile);
  const metadata = await image.metadata();

  // Pastikan pdfName ada nilainya
  if (!pdfName) pdfName = "default.pdf"; 
  
  // Tentukan lokasi folder tmp
  const outputPath = path.join("./tmp", pdfName);

  if (!pdf) {
    pdf = new pdfkit({
      size: [metadata.width, metadata.height],
      margins: { top: 0, bottom: 0, left: 0, right: 0 }
    });
    
    // Pastikan folder tmp sudah dibuat dulu!
    if (!fs.existsSync('./tmp')) fs.mkdirSync('./tmp');
    
    pdf.pipe(fs.createWriteStream(outputPath)); // Gunakan outputPath yang sudah pasti string
  } else {
    pdf.addPage({
      size: [metadata.width, metadata.height],
      margins: { top: 0, bottom: 0, left: 0, right: 0 }
    });
  }

  pdf.image(imageFile, 0, 0, {
    width: metadata.width,
    height: metadata.height,
  });

  return pdf;
}

async function TMP(filePath) {
    try {
        // 1. Baca file jadi buffer dulu supaya fileType gak error
        const buffer = fs.readFileSync(filePath);
        
        // 2. Cek tipe file dari buffer
        const ft = await fileTypeFromBuffer(buffer);
        const ext = ft ? ft.ext : 'pdf'; // Default ke pdf kalau gak ketemu
        
        // 3. Siapkan Form Data
        const cok = new FormData();
        // Gunakan fs.createReadStream untuk upload agar lebih efisien
        cok.append('file', fs.createReadStream(filePath), {
            filename: `Chandra-${Math.floor(Math.random() * 10000)}.${ext}`
        });

        // 4. Hit API tmpfiles.org
        const response = await axios.post('https://tmpfiles.org/api/v1/upload', cok, {
            headers: {
                ...cok.getHeaders()
            }
        });

        if (response.data && response.data.data) {
            const url = response.data.data.url;
            // Ubah link view menjadi link download langsung
            return url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
        } else {
            throw new Error("Gagal mendapatkan URL dari TMPFiles");
        }
    } catch (e) {
        console.error("Error di fungsi TMP:", e.message);
        throw e;
    }
}
