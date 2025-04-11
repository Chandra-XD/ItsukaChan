import { HuggingFaceBuffer } from '../lib/huggingface.js';
import { upSkizo } from '../lib/tempfile.js';

let handler = async (m, {
    conn,
    args
}) => {
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else return m.reply("Prompt?")
    try {
        const MODEL = 'stabilityai/stable-diffusion-xl-base-1.0';
        const openAIResponse = await HuggingFaceBuffer(MODEL, encodeURIComponent(text))

        if (openAIResponse) {
        let link = await upSkizo(openAIResponse)
            await conn.sendMessage(m.chat, { image: openAIResponse, caption: `${link.url}`, mentions: [m.sender] }, { quoted: m})
        } else {
            console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
        }
    } catch (e) {
        console.error("Terjadi kesalahan:", e);
        await m.reply(e);
    }
}
handler.help = ["txt2img"]
handler.tags = ["ai"]
handler.command = /^txt2img$/i
export default handler