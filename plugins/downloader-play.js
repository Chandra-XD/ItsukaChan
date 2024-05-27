import ytdl from 'ytdl-core'
import fs from 'fs'
import ffmpeg from 'fluent-ffmpeg'
import search from 'yt-search'

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Input Query'
  conn.sendMessage(m.chat, { react: { text: `🕑`, key: m.key }})
  try {
    let results = await search(text);
    let videoId = results.videos[0].videoId;
    let info = await ytdl.getInfo(videoId);
    let title = info.videoDetails.title.replace(/[^\w\s]/gi, '');
    let thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    let url = info.videoDetails.video_url;
    let duration = parseInt(info.videoDetails.lengthSeconds);
    let uploadDate = new Date(info.videoDetails.publishDate).toLocaleDateString();
    let views = info.videoDetails.viewCount;
    let minutes = Math.floor(duration / 60);
    let description = results.videos[0].description;
    let seconds = duration % 60;
    let durationText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;       
    let audio = ytdl(videoId, { quality: 'highestaudio' });
    let inputFilePath = './tmp/' + title + '.webm';
    let outputFilePath = './tmp/' + title + '.mp3';
    let viewsFormatted = formatViews(views);
    let caption = `*Title*: ${title}\n*Duration*: ${durationText}\n*Upload*: ${uploadDate}\n*Views*: ${viewsFormatted}\n*ID*: ${videoId}\n*Description*: ${description}\n*URL*: ${url}
  `;
    const pesan = conn.sendMessage(m.chat, { image: { url: thumbnailUrl }, caption }, { quoted: m})

    audio.pipe(fs.createWriteStream(inputFilePath)).on('finish', async () => {
      ffmpeg(inputFilePath)
        .toFormat('mp3')
        .on('end', async () => {
          let buffer = fs.readFileSync(outputFilePath);                    
          conn.sendMessage(m.chat, {         
                audio: buffer,
                mimetype: 'audio/mpeg'
            }, { quoted: m}
          fs.unlinkSync(inputFilePath);
          fs.unlinkSync(outputFilePath);
        })
        .on('error', (err) => {
          console.log(err);
          m.reply(`There was an error converting the audio: ${err.message}`);
          fs.unlinkSync(inputFilePath);
          fs.unlinkSync(outputFilePath);
        })
        .save(outputFilePath);
    });
  } catch (e) {
    console.log(e);
    m.reply(`An error occurred while searching for the song: ${e.message}`);
  }
};

handler.help = handler.alias = ['play'].map(v => v + ' <query>')
handler.tags = ['downloader']
handler.command = /^(play)$/i
export default handler

function formatViews(views) {
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + 'M';
  } else if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'K';
  } else {
    return views.toString();
  }
	    
