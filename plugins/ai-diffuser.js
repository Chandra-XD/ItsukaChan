import { HuggingFaceBuffer } from '../lib/huggingface.js';
import { upSkizo } from '../lib/tempfile.js';

let handler = async (m, {
    conn,
    text
}) => {
    const input_data = [
        'Daniil-plotnikov/realism-diffusion',
        'aipicasso/manga-diffusion-poc',
        'Envvi/Inkpunk-Diffusion',
        'tensor-diffusion/AsianRealistic_SDLife_ChiasedammeV9.0',
        'hakurei/waifu-diffusion',
        'nitrosocke/mo-di-diffusion',
        'nitrosocke/Ghibli-Diffusion'
    ];

    let [urutan, tema] = text.split("|")
    if (!tema) return m.reply("Input query!\n*Example:*\n.diffuser 1 | a girl")
    try {
        let data = input_data.map((item, index) => ({
            title: (item.split('/')[1]).toUpperCase(),
            id: item
        }));
        if (!urutan) return m.reply("Input query!\n*Example:*\n.diffuser [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        if (isNaN(urutan)) return m.reply("Input query!\n*Example:*\n.diffuser [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        if (urutan > data.length) return m.reply("Input query!\n*Example:*\n.diffuser [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        let out = data[urutan - 1].id
        
        const openAIResponse = await HuggingFaceBuffer(out, encodeURIComponent(tema));

        if (openAIResponse) {
            let link = await upSkizo(openAIResponse)
            await conn.sendMessage(m.chat, { image: openAIResponse, caption: `*${out}*\n${link.url}`, mentions: [m.sender] }, { quoted: m})
        } else {
            console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
        }
    } catch (e) {
        console.error("Terjadi kesalahan:", e);
        await m.reply(e);
    }
}
handler.help = ["diffusion"]
handler.tags = ["ai"]
handler.command = /^(diffusion|diff)$/i
export default handler