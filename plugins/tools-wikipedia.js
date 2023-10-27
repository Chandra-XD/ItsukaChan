import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    text,
    usedPrefix,
    command
}) => {
    if (!text) throw `Contoh penggunaan ${usedPrefix + command} Javascript`
    try {
        let item = await Wikipedia(text)
        let caption = `*Title:* ${item.title || 'Tidak diketahui'}\n*Content:* ${item.content || 'Tidak diketahui'}\n*Information:* ${item.infoTable || 'Tidak diketahui'}`
        await conn.sendFile(m.chat, item.image, "", caption, m)
    } catch (e) {
        throw e
    }
}
handler.help = ['wikipedia'].map(v => v + ' <query>')
handler.tags = ['tools']
handler.command = /^(wiki|wikipedia)$/i
export default handler

async function Wikipedia(query) {
    const response = await fetch(`https://id.m.wikipedia.org/w/index.php?search=${query}`);
    const html = await response.text();
    const $ = cheerio.load(html);

    const contentArray = [];
    $('div.mw-parser-output p').each((index, element) => {
        contentArray.push($(element).text().trim());
    });

    const infoTable = [];
    $('table.infobox tr').each((index, element) => {
        const label = $(element).find('th.infobox-label').text().trim();
        const value = $(element).find('td.infobox-data').text().trim() || $(element).find('td.infobox-data a').text().trim();
        if (label && value) {
            infoTable.push(`${label}: ${value}`);
        }
    });

    const data = {
        title: $('title').text().trim(),
        content: contentArray.join('\n'), // Menggabungkan konten menjadi satu string dengan newline separator
        image: 'https:' + ($('#mw-content-text img').attr('src') || '//i.postimg.cc/Z5b1WDwD/1675949861324.jpg'),
        infoTable: infoTable.join('\n') // Menggabungkan infoTable menjadi satu string dengan newline separator
    };

    return data;
};
