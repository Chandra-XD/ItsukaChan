let handler = async (m, { conn }) => {
let totalf = Object.values(global.plugins).filter(
    (v) => v.help && v.tags
  ).length;
m.reply(`Total Fitur saat ini: ${totalf}`)
}

handler.help = ['totalfitur']
handler.tags = ['info']
handler.command = ['totalfitur']
export default handler
