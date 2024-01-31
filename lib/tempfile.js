import axios from 'axios'
import FormData from 'form-data'
import { fileTypeFromBuffer } from 'file-type'

async function TMP(path) {
	const { ext } = await fileTypeFromBuffer(path) || {}
	const cok = new FormData()
	cok.append('file', path, `${~~(Math.random() * 1e4)}.${ext}`)
	const response = await axios.post('https://tmpfiles.org/api/v1/upload', cok.getBuffer(), { headers: cok.getHeaders() }).catch(e => e.response)
  const link = response.data
  return link.data.url.replace('tmpfiles.org', 'tmpfiles.org/dl')
}

async function fileIO(path){
  const { ext } = await fileTypeFromBuffer(path) || {}
  const form = new FormData()
  form.append('file', path, { filename: `${~~(Math.random() * 1e4)}.${ext}` })
  const res = await fetch('https://file.io/?expires=1d', {
    method: 'POST',
    body: form,
  });
  const json = await res.json()
  if (!json.success) {
    throw json
  }
  return json.link
}

async function upSkizo(buffer){
	let res = await axios.post('https://mxmxk-up.hf.space/upload', {
		file: buffer.toString('base64')
	}).catch(e => e.response)
	return res.status !== 200 ? res.statusText : res.data
}

export { 
    TMP,
    fileIO,
    upSkizo
}