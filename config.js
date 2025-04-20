import chalk from 'chalk'
import { fileURLToPath } from 'url'
import { watchFile, unwatchFile } from 'fs'

// Ini owner real no fek"
global.owner = [
  ['6281882884550'], // global owner 0
  ['6283835786010'], // global owner 1
  ['6287774569531'],
  ['212701929375'], ['212706611366'], // global owner 2
  ['6281882884550', 'Chandra XD', true] // global owner 3
]

global.mods = [] // Want some help?
global.prems = [] // Premium user has unlimited limit
global.APIs = {
  can: 'https://pnggilajacn.my.id',
  skizo: 'https://skizo.tech'
}
global.APIKeys = {
  'https://pnggilajacn.my.id': 'ItsukaChan',
  'https://skizo.tech': 'Chandra-pecinta-milf'
}

global.thumbnailUrl = [
  'https://telegra.ph/file/81260a8b9e8cff26d2b48.jpg', 'https://telegra.ph/file/ac4928f0824a2a0492737.jpg',
  'https://telegra.ph/file/6359b013bc7e52c3b346f.jpg', 'https://telegra.ph/file/d43c89a5d2da72875ec05.jpg',
  'https://telegra.ph/file/7d6c0e35f9c8f52715541.jpg', 'https://telegra.ph/file/ef4b742d47e6a9115e2ff.jpg',
  'https://telegra.ph/file/55e5af5f33fbd57104187.jpg', 'https://telegra.ph/file/af236598456b95884bd15.jpg',
  'https://telegra.ph/file/de92ed4a729887ffc974c.jpg', 'https://telegra.ph/file/00ce42a193b1dbbf907d4.jpg'
]

//====== Url Template Buttons ======//
global.dtu = 'ᴅᴏɴᴀᴛᴇ'
global.urlnya = "https://pnggilajacn.my.id"
//========== callButtons ==========//
global.dtc = 'ᴄᴀʟʟ ᴏᴡɴᴇʀ'
global.phn = '+62 818-8288-4550'

// Sticker WM
global.packname = `ItsukaBot-Md`
global.author = `© 2021-2025`

// Random
global.wm = `Powered by https://pnggilajacn.my.id`
global.doc = pickRandom(["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/msword", "application/pdf"])
global.ephemeral = '86400' // 86400 = 24jam, kalo ingin di hilangkan ganti '86400' jadi 'null' atau ''
global.monitor = `u2106481-76cf864349cc28f91d3e626f` // Ambil di https://uptimerobot.com
global.audd = `44b0ffae4931bc9e512780b8df62d858`
global.multiplier = 69 // The higher, The harder levelup
global.ram_usage = 600000000 // 600 MB in this example [Ram Limiter (if your server ram is 1GB put 900MB in bytes, later the server will auto restart before using 1GB ram)]

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
