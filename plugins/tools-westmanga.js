import cheerio from "cheerio"
import fetch from "node-fetch"
import fs from "fs"
import path from "path"
import { convertZipToPdf } from '../lib/pdfConverter.js';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {

    let lister = [
        "tips",
        "search",
        "episode",
        "link",
        "down",
        "convert",
        "pdf"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.west search|manga\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "tips") {
            let cap = "*[ WESTMANGA TIPS ]*\n\n1. Cari manga memakai perintah *.west search|query* ubah query sesuka kalian.\n2. Mengambil episode memakai perintah *.west episode|query* ubah query dari hasil link sebelumnya.\nContoh link: https://westmanga.fun/manga/a-nyakuza-manga/\n3. Mengambil link download memakai perintah *.west link|query* ubah query dari hasil link sebelumnya.\nContoh link: https://westmanga.fun/a-nyakuza-manga-chapter-00-bahasa-indonesia/\n4. Mendownload data memakai perintah *.west down|query* ubah query dari hasil link sebelumnya.\nContoh link: https://downloader.4youscan.xyz/?id=296931\n5. Melakukan pengunduhan lalu mengkonversi memakai perintah *.west convert* kemudian tunggu beberapa waktu dan ketik *.west pdf* untuk mengambil file PDF manga nya."
            try {
                await m.reply(cap)
            } catch (e) {
                throw e
            }
        }

        if (feature == "link") {
            if (inputs.includes("https://westmanga.fun/manga/")) return m.reply("input link dari westmanga?")
            try {
                let res = await DownWest(inputs)
                let cap = "*Link:*\n" + res + "\n\nKetik *.west down*|" + res + " untuk menyimpan file nya"
                await m.reply(cap)
            } catch (e) {
                throw e
            }
        }

        if (feature == "down") {
            let cap = "Input link untuk di download zip?\nKetik *.west convert* untuk mengkonversi file nya\ndan *.west pdf* untuk mengambil hasil konversi"
            if (!inputs) return m.reply(cap)
            try {
                await downloadImages(inputs)
            } catch (e) {
                throw e
            }
        }

        if (feature == "pdf") {
            try {
                if(!fs.readFileSync('./tmp/res.pdf')) return m.reply("Convert dulu dengan perintah *.west convert*")
                await conn.sendFile(m.chat, fs.readFileSync('./tmp/res.pdf'), 'Westmanga nya kak!', '', m, false, { asDocument: true })
                await m.reply("*Note:*\nJika pdf tidak bisa terbuka berarti proses konversi belum selesai atau eror")
            } catch (e) {
                throw e
            }
        }

        if (feature == "convert") {
            let cap = "\nKetik *.west pdf* untuk mengambil hasil konversi"
            await m.reply(cap)
            const zipFile = "./tmp/res.zip"
            try {
                const pdfName = "./tmp/res.pdf"
                await convertZipToPdf(zipFile, pdfName)
            } catch (e) {
                throw e
            }
        }

        if (feature == "search") {
            if (!inputs) return m.reply("Query?")
            try {
                let res = await SearchWest(inputs)
                let list = res.map((item, index) => `*Title:* ${item.titles}\n*Url:* ${item.value}`).join("\n")
                await m.reply(list)
            } catch (e) {
                throw e
            }
        }

        if (feature == "episode") {
            if (!inputs.includes("https://westmanga.fun/manga/")) return m.reply("input link dari https://westmanga.fun/manga?")
            try {
                let res = await SearchWest2(inputs)
                let list = res.map((item, index) => `*Title:* ${item.titles}\n*Url:* ${item.value}`).join("\n")
                await m.reply(list)
            } catch (e) {
                throw e
            }
        }

    }
}
handler.help = ["west"]
handler.tags = ["tools"]
handler.command = /^(west(manga)?)$/i
export default handler

/* New Line */
async function DownWest(url) {
    // Array JSON untuk menyimpan hasil ekstraksi
    const result = []

    // Fetch halaman web
    return await fetch(url)
        .then(response => response.text())
        .then(data => {
            // Load HTML dengan Cheerio
            const $ = cheerio.load(data)

            // Cari semua elemen span dengan class "dlx r"
            $("span.dlx.r").each((index, element) => {
                // Ambil link dari a href pada elemen span saat ini
                const link = $(element).find("a").attr("href")
                let pairs = url.substring(url.indexOf("/") + 1).split("/")
                // Tambahkan data ke dalam array JSON
                result.push({
                    title: pairs[2],
                    value: link
                })
            })

            // Tampilkan hasil
            return result[0].value
        })
}

async function downloadImages(input) {
    try {
        const Blobs = await fetch(input)
            .then((res) => res.blob())
        const arrayBuffer = await Blobs.arrayBuffer()
        const zipBuffer = Buffer.from(arrayBuffer)
        await fs.promises.writeFile(path.join("./tmp", "res.zip"), zipBuffer)
        console.log("Download complete")
    } catch (err) {
        console.error("Download failed:", err)
    }
}

async function SearchWest(url) {
    // Array JSON untuk menyimpan hasil ekstraksi
    const result = []

    // Fetch halaman web
    return await fetch("https://westmanga.fun/?s=" + url)
        .then(response => response.text())
        .then(data => {
            // Load HTML dengan Cheerio
            const $ = cheerio.load(data)

            // Cari semua elemen span dengan class "dlx r"
            $("div.bsx").each((index, element) => {
                // Ambil link dari a href pada elemen span saat ini
                const link = $(element).find("a").attr("href")
                const titles = $(element).find("a").attr("title")

                // Tambahkan data ke dalam array JSON
                result.push({
                    titles: titles,
                    value: link
                })
            })

            // Tampilkan hasil
            return result
        })
}

async function SearchWest2(url) {
    // Array JSON untuk menyimpan hasil ekstraksi
    const result = []

    // Fetch halaman web
    return await fetch(url)
        .then(response => response.text())
        .then(data => {
            // Load HTML dengan Cheerio
            const $ = cheerio.load(data)

            // Cari semua elemen span dengan class "dlx r"
            $("div.eph-num").each((index, element) => {
                // Ambil link dari a href pada elemen span saat ini
                const cap = $(element).find("span").text()
                const link = $(element).find("a").attr("href")

                // Tambahkan data ke dalam array JSON
                result.push({
                    titles: cap,
                    value: link
                })
            })

            // Tampilkan hasil
            return result
        })
}