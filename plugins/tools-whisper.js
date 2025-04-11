let handler = async (m, { conn, args }) => {
	if (!m.quoted) throw 'Reply Audio'
	if (!m.quoted.mimetype?.includes('audio')) throw 'Reply Audio'
	let api = await axios.post('https://api.deepinfra.com/v1/inference/openai/whisper-large-v3?version=3d0618527a343f8ad58c34d26542213f0444e901', {
		audio: `data:audio/ogg;base64,${(await m.quoted.download()).toString('base64')}`,
		language: 'id'
	})
    await conn.reply(m.chat, api.data.text, m)
}
handler.help = ['whisper']
handler.tags = ['tools']
handler.command = /^whisper$/i
export default handler