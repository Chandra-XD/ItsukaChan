import axios from 'axios'
import FormData from 'form-data'
import { fileTypeFromBuffer } from 'file-type'

  const rnd = () => {
  const chars = 'aBcDe1FgHiJk8Lm6NoPqRsTuV9wXyZA7bCdE2fGhIj5KlM3nOpQ4rStUvW0xYz'
  const num = Math.floor(Math.random() * 10) + 1;
  return Array.from({ length: num }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('')
}

async function TMP(path) {
	const { ext } = await fileTypeFromBuffer(path) || {}
	const cok = new FormData()
	cok.append('file', path, `Chandra-`+`${rnd()}.${ext}`)
	const response = await axios.post('https://tmpfiles.org/api/v1/upload', cok.getBuffer(), { headers: cok.getHeaders() }).catch(e => e.response)
  const link = response.data
  return link.data.url.replace('tmpfiles.org', 'tmpfiles.org/dl')
}

export { 
    TMP }