let handler = async (m, { conn, args }) => {
  global.db.data.bacot = global.db.data.bacot ? global.db.data.bacot : '*Random Bacot*'
  if (args[0] == 'add' && args[1]) {
  if (args[1] > 100) return m.reply('Teks terlalu panjang, maksimal 100 teks')
    global.db.data.bacot += `\n•> ${args.slice(1).join(' ')}`
    m.reply(`Done, tersimpan di database bacot!!`)
 } else if (!args[0]) { 
     m.reply(global.db.data.bacot)
  } else return m.reply('Format salah!\nContoh: #bacot add bacotanlu\n\n#bacot add gwe sebenarnya pengen jadi anime tapi gw sadar ini bukan isekai')
}
handler.help = ['bacot']
handler.tags = ['general']
handler.command =/^(bacot|bct)$/i

export default handler