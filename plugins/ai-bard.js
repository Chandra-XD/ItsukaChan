import fetch from "node-fetch";
import cheerio from "cheerio";

let handler = async (m, {
    conn,
    text
}) => {
    if (!m.quoted) return m.reply("Reply Teks/Audio untuk menggunakan gpt ini");

    try {
        if (m.quoted.text) {
            let res = await gptChat(m.quoted.text);
            await m.reply(res.data);
        } else if (m.quoted.mimetype.includes("audio")) {
            let audioBuff = await m.quoted.download();
            let res = await gptAudio(audioBuff);
            await m.reply(res.data);
        }
    } catch (e) {
        await m.reply('Error occurred. Please try again.');
    }
};

handler.help = ["bard"];
handler.tags = ["ai"];
handler.command = /^(bard)$/i;

export default handler;

/* New Line */
async function gptAudio(audioBuffer) {
    try {
        const info = await getInfo();
        const data = new FormData();
        const blob = new Blob([audioBuffer.toArrayBuffer()], {
            type: 'audio/mpeg'
        });
        data.append('_wpnonce', info[0]['data-nonce']);
        data.append('post_id', info[0]['data-post-id']);
        data.append('action', 'wpaicg_chatbox_message');
        data.append('audio', blob, 'wpaicg-chat-recording.wav');
        const response = await fetch('https://bartai.org/wp-admin/admin-ajax.php', {
            method: 'POST',
            body: data
        });

        if (!response.ok) throw new Error('Network response was not ok');

        return await response.json();
    } catch (error) {
        console.error('An error occurred:', error.message);
        throw error;
    }
}

async function gptChat(message) {
    try {
        const info = await getInfo();
        const data = new FormData();
        data.append('_wpnonce', info[0]['data-nonce']);
        data.append('post_id', info[0]['data-post-id']);
        data.append('action', 'wpaicg_chatbox_message');
        data.append('message', message);
        const response = await fetch('https://bartai.org/wp-admin/admin-ajax.php', {
            method: 'POST',
            body: data
        });

        if (!response.ok) throw new Error('Network response was not ok');

        return await response.json();
    } catch (error) {
        console.error('An error occurred:', error.message);
        throw error;
    }
}

async function getInfo() {
    const url = 'https://bartai.org';

    try {
        const html = await (await fetch(url)).text();
        const $ = cheerio.load(html);

        const chatData = $('.wpaicg-chat-shortcode').map((index, element) => {
            return Object.fromEntries(Object.entries(element.attribs));
        }).get();

        return chatData;
    } catch (error) {
        throw new Error('Error:', error.message);
    }
}