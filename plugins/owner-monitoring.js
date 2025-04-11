import fetch from "node-fetch";

async function postRequest(url, form) {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'cache-control': 'no-cache'
    },
    body: new URLSearchParams(form)
  };

  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

const handler = async (m, { conn, command, text }) => {

  if (command === 'uptimerobot') {
    if (text) {
      const [action, input, inputs] = text.split('|');

      if (action === 'new') {
        const newMonitorOptions = {
          api_key: global.monitor,
          format: 'json',
          type: '1',
          url: input || 'http://myMonitorURL.com',
          friendly_name: inputs || 'My Monitor'
        };

        try {
          const response = await postRequest('https://api.uptimerobot.com/v2/newMonitor', newMonitorOptions);
          console.log(response); // Log the response, or do something else with it
          if (response.stat === "ok" && response.monitor?.id) {
            m.reply(`Monitor baru berhasil dibuat dengan ID: ${response.monitor.id}`);
          } else {
            m.reply('Gagal membuat monitor baru.');
          }
        } catch (e) {
          console.error(e);
          m.reply('Gagal membuat monitor baru.');
        }
      } else if (action === 'del') {
        const deleteMonitorOptions = {
          api_key: global.monitor,
          format: 'json',
          id: input || '777712827'
        };

        try {
          const response = await postRequest('https://api.uptimerobot.com/v2/deleteMonitor', deleteMonitorOptions);
          console.log(response); // Log the response, or do something else with it
          if (response.stat === "ok" && response.monitor?.id) {
            m.reply(`Monitor dengan ID: ${response.monitor.id} berhasil dihapus.`);
          } else {
            m.reply('Gagal menghapus monitor.');
          }
        } catch (error) {
          console.error(error);
          m.reply('Gagal menghapus monitor.');
        }
      } else if (action === 'stats') {
        const getMonitorsOptions = {
          api_key: global.monitor,
          format: 'json',
          logs: '1'
        };

        try {
          const response = await postRequest('https://api.uptimerobot.com/v2/getMonitors', getMonitorsOptions);
          const monitors = response.monitors;

          let replyMsg = 'Statistik Monitor :\n\n';
          for (const monitor of monitors) {
            const log = monitor.logs[0];
            replyMsg += `Monitor ${monitor.id}:\n`;
            replyMsg += `- Nama: ${monitor.friendly_name}\n`;
            replyMsg += `- URL: ${monitor.url}\n`;
            replyMsg += `- Tipe: ${monitor.type}\n`;
            replyMsg += `- Interval: ${monitor.interval} detik\n`;
            replyMsg += `- Status: ${monitor.status === 1 ? 'Tidak Aktif' : 'Aktif'}\n\n`;
            replyMsg += `Log terakhir:\n`;
            replyMsg += `- Tipe: ${log.type}\n`;
            replyMsg += `- Waktu: ${log.datetime}\n`;
            replyMsg += `- Durasi: ${log.duration} detik\n\n`;
            replyMsg += '-------------------------\n\n';
          }
          m.reply(replyMsg);
        } catch (e) {
          console.error(e);
          m.reply('Gagal mengambil statistik monitor.');
        }
      } else {
        m.reply('Aksi tidak valid! Gunakan `new|input`, `del|input`, atau `stats`.');
      }
    } else {
      m.reply('Harap berikan perintah yang valid! Gunakan `new|input`, `del|input`, atau `stats`.');
    }
  }
}

handler.help = ['uptimerobot']
handler.tags = ['owner']
handler.owner = true
handler.command = /^(uptimerobot)$/i
export default handler