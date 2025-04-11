import got from 'got';
import {
    format
} from 'util';

const handler = async (m, {
    conn,
    args
}) => {
    if (!args[0]) return conn.reply(m.chat, 'URL tidak boleh kosong', m);
    const regex = /\/([A-Za-z0-9_-]+)$/;
    const match = args[0].match(regex);
    if (!match) return conn.reply(m.chat, "Format URL tidak didukung", m);
    const shortUrl = match[1];
    try {
        const res = await fetchInfo(shortUrl, args[2]);
        const selectedFileIndex = parseInt(args[1]) - 1;
        const selectedFile = res[selectedFileIndex];
        if (!args[1] || selectedFileIndex < 0 || selectedFileIndex >= res.length) {
            return conn.reply(m.chat, "Masukkan nomor yang valid. Contoh: .terabox " + args[0] + " 1\n\n(1 sampai " + res.length + ")", m);
        }
        const fileInfo = await fetchDownload({
            shareid: selectedFile.shareid,
            uk: selectedFile.uk,
            sign: selectedFile.sign,
            timestamp: selectedFile.timestamp,
            fs_id: selectedFile.fs_id
        });
        const sizeLimit = 100 * 1025 * 1030;
        const formattedSize = formatSize(fileInfo.size);
        if (fileInfo.size > sizeLimit) {
            return conn.reply(m.chat, "Ukuran file melebihi batas 140MB. Ukuran file: " + formattedSize, m);
        }
        if (fileInfo.ok) {
            const caption = `*Title:* ${selectedFile.name}\n*Size:* ${formattedSize}`;
            return conn.sendFile(m.chat, fileInfo.downloadLink, selectedFile.name, caption, m, true, {
                quoted: m,
                mimetype: fileInfo.mime
            });
        } else {
            return conn.reply(m.chat, 'Terjadi kesalahan saat mengunduh file', m);
        }
    } catch (error) {
        return conn.reply(m.chat, 'Terjadi kesalahan', m);
    }
};

handler.help = ['terabox'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(terabox)$/i;
export default handler;

async function getMimeTypeAndSizeFromURL(url) {
    try {
        const response = await got.head(url);
        const contentType = response.headers['content-type'];
        const contentLength = response.headers['content-length'];
        return {
            mimeType: contentType,
            size: contentLength
        };
    } catch (error) {
        console.error('Error getting content type and size:', error);
        return null;
    }
}

async function fetchDownload({
    shareid,
    uk,
    sign,
    timestamp,
    fs_id
}) {
    try {
        const response = await got.post("https://terabox-dl.qtcloud.workers.dev/api/get-download", {
            json: {
                shareid,
                uk,
                sign,
                timestamp,
                fs_id
            },
            responseType: 'json',
        });
        if (!response.ok) {
            const errorBody = response.body;
            console.log(`Failed to get download data: ${errorBody.message}`);
        }
        const data = response.body;
        const result = await getMimeTypeAndSizeFromURL(data.downloadLink);
        return {
            ok: data.ok,
            downloadLink: data.downloadLink,
            mime: result.mimeType || 'application/octet-stream',
            size: result.size || 0
        };
    } catch (error) {
        console.error('Error while downloading:', error);
        throw error;
    }
}

async function fetchInfo(shortUrl, pwd = '') {
    try {
        const response = await got(`https://terabox-dl.qtcloud.workers.dev/api/get-info?shorturl=${shortUrl}&pwd=${pwd}`, {
            responseType: 'json',
        });
        if (!response.ok) {
            const errorBody = response.body;
            console.log(`Failed to get information: ${errorBody.message}`);
        }
        const body = response.body;

        function recursiveList(list) {
            return list.map((item) => ({
                isDir: item.is_dir !== 0,
                name: item.filename,
                shareid: body.shareid,
                uk: body.uk,
                sign: body.sign,
                timestamp: body.timestamp,
                fs_id: item.fs_id
            }));
        }
        return recursiveList(body.list);
    } catch (error) {
        console.error('Error while fetching information:', error);
        throw error;
    }
}

function formatSize(sizeInBytes) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let index = 0;
    let size = sizeInBytes;
    while (size >= 1024 && index < units.length - 1) {
        size /= 1024;
        index++;
    }
    return format('%s %s', size.toFixed(2), units[index]);
}