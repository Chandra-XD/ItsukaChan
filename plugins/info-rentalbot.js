import { apivisit } from './kanghit.js'

let handler = async (m, { conn }) => {
let tekss = `*Jadwal Pelajaran Tekajeh 2*

*Senin*
- B. Inggris
- Sejarah Indonesia
- Seni Budaya
- Upacara

*Selasa*
- PAI
- Sejarah Indonesia
- PPKN

*Rabu*
- B. Inggris
- Kimia Fisika
- Seni Budaya

*Kamis*
- Matematika
- B. Sunda
- Simulasi Digital

*Jum'at*
- Seni Budaya
- Produktif TKJ

*Sabtu*
- B. Indonesia
- Produktif

*Tambahan*
Jum'at : Administrasi infrastruktur jaringan
Sabtu : Pemrograman dasar, Administrasi infrastruktur jaringan, Teknologi WAN


Piket Gwe Senin`
await m.reply(tekss)
await apivisit
}
//handler.help = ['iklan']
//handler.tags = ['info']
handler.command = /^(tkj2)$/i
export default handler