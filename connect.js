import P from 'pino'
import readline from 'readline'
import { useMultiFileAuthState, makeWASocket } from '@whiskeysockets/baileys'

const rl = readline.createInterface(process.stdin, process.stdout)
const question = (text) => new Promise((resolve) => rl.question(text, resolve))

async function startSock() {
	const authState = await useMultiFileAuthState('session')
	
	const conn = makeWASocket({
	version: [ 2, 3000, 1015901307 ],
		auth: authState.state,
		browser: ['Linux', 'Chrome', '22'],
		logger: P({ level: 'silent' }),
		markOnlineOnConnect: true,
		printQRInTerminal: false
	})
	
	if (!(conn.authState.creds.registered && (conn.user || {}).id)) {
		let phoneNumber = await question('Please enter your mobile phone number:\n')
		phoneNumber = phoneNumber.replace(/\D/g, '')
    setTimeout(async () => {
		let code = await conn.requestPairingCode(phoneNumber)
		console.log('Pairing code:', (code.match(/.{1,4}/g) || []).join('-'))
      }, 3000)
	}
	
	conn.ev.on('creds.update', authState.saveCreds.bind(conn))
	
	conn.ev.on('connection.update', async (update) => {
		console.log(update)
		if (update.connection === 'close') {
			await startSock()
		} else if (update.connection === 'open') {
			console.log(conn.user)
		}
	})
	
	return conn
}

startSock()
