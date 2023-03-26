let handler = async (m, { conn }) => {
let url = await conn.profilePictureUrl(global.owner[0] + '@s.whatsapp.net', 'image').catch(_ => `https://storage.pnggilajacn.my.id/file/my-profile.jpg`) 
let teks = `*───────[ BIODATA OWNER ]───────*
*💌 Nama* : Chandra XD 3.07
*✉️ Nama RL* : Candra
*♂️ Gender* : Laki - laki
*🕋 Agama* : Islam
*⏰ Tanggal lahir* : 13 Maret 2007
*🎨 Umur* : 16
*🧮 Kelas* : 10
*🧩 Hobby* : Nonton Anime, Chatting, Dengerin Musik
*💬 Sifat* : Baik, Sopan, Seru Orangnya
*🗺️ Tinggal* : Bogor, Citeureup, Jawa barat Indonesia
*❤️ Suka* : Suasana yang tenang
*💔 Benci* : Anak kecil atau kakak² yang gasopan

*───────[ SOSIAL MEDIA ]───────*
*📷 instagran* : @pnggilajacn
*🇫  Facebook* : @pnggilajacn
*🏮 Chanel Youtube* : @ChandraXD307
*🐈 Github:* @Chandra-XD

`
conn.sendMessage(m.chat, { image: { url }, caption: teks }, { quoted: m})
}
handler.help = ['bioowner']
handler.tags = ['info']
handler.command = /^(bioowner)$/i
export default handler
