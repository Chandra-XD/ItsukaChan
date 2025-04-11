import jimp from 'jimp'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'
import moment from 'moment-timezone'
const {
  downloadContentFromMessage,
  BufferJSON,
  WA_DEFAULT_EPHEMERAL,
  generateWAMessageFromContent,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  areJidsSameUser,
  InteractiveMessage,
  getContentType,
} = pkg
import pkg from "@whiskeysockets/baileys"

let tags = {}
const defaultMenu = {
  before: `%readmore`,
  header: '`%category`',
  body: '> • %cmd %islimit %isPremium',
  footer: ``,
  after: ``,
}

let handler = async (m, { conn, usedPrefix: _p, args, command }) => {
    let name = m.pushName || conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Jakarta'
    })
    let time = d.toLocaleTimeString(locale, { timeZone: 'Asia/Jakarta' })
    time = time.replace(/[.]/g, ':')
    let _uptime
    if (process.send) {
      process.send('uptime')
      _uptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let uptime = clockString(_uptime)
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    /*
let groups = Object.keys(await conn.groupFetchAllParticipating())
let chats = Object.keys(await conn.chats)
let block = await conn.fetchBlocklist()


*INFO BOT*
•> Aktif selama ${uptime}
•> *${groups.length}* Grup
•> *${chats.length - groups.length}* Chat Pribadi
•> *${Object.keys(global.db.data.users).length}* Pengguna
•> ${block == undefined ? '*0* Diblokir' : '*' + block.length + '* Diblokir'}
•> *${Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned).length}* Chat Terbanned
•> *${Object.entries(global.db.data.users).filter(user => user[1].banned).length}* Pengguna Terbanned
` */
let judul = `*INFO ANTISPAM*
Chat Pribadi : xxx
Grup : 10 detik

Join grup bot : https://ln.run/3QVf2
`
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag].toUpperCase()) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? 'Ⓛ' : '')
                .replace(/%isPremium/g, menu.premium ? 'Ⓟ' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime,
      me: conn.getName(conn.user.jid),
      name, date, time,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    let pp = await conn.profilePictureUrl(conn.user.jid, 'image').catch(_ => './src/avatar_contact.png')
    
    conn.menuitsuka = conn.menuitsuka ? conn.menuitsuka : {}
    if (m.sender in conn.menuitsuka) {
        let { key } = await conn.reply(m.chat, `*Jangan spam!!*\nBacalah menu yang sudah bot tampilkan.`, null)
       setTimeout(() => {
      conn.sendMessage(m.chat, { delete: key })
    }, 5 * 60 * 1000)
        throw false
    }
  
let captione = `${judul}${text.trim()}`
let { key } = await conn.sendMessage(m.chat, { video: { url: `https://github.com/Chandra-XD/cn-grabbed-result/raw/main/media/video/amv${Math.floor(Math.random() * 5) + 1}.mp4` }, gifPlayback: true, gifAttribution: ~~(Math.random() * 2), caption: captione, contextInfo: { mentionedJid: [m.sender], forwardingScore: 155, isForwarded: true, }}, { quoted: { key: { participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast'}, message: { pollCreationMessage: { name: `Simple Bot WhatsApp` } } } })

// await conn.sendMessage(m.chat, { text: captione, contextInfo: { externalAdReply : { mediaType: 1, renderLargerThumbnail: true, description: null, title: `${ucapan()} ${conn.getName(m.sender)}`, body: null, thumbnail: await (await conn.getFile(`https://i.ibb.co/s9Syy6h/IMG-20240515-WA0470.png`)).data, sourceUrl: "https://ln.run/3QVf2" }}})

let msg = generateWAMessageFromContent(
        m.chat,
        {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2,
              },
              interactiveMessage: proto.Message.InteractiveMessage.create({
                contextInfo: {
                  mentionedJid: [m.sender],
                  isForwarded: true,
                  forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363267533195844@newsletter",
                    newsletterName: "@pnggilajacn",
                    serverMessageId: -1,
                  },
                  businessMessageForwardInfo: {
                    businessOwnerJid: conn.decodeJid(conn.user.id),
                  },
                },
                body: proto.Message.InteractiveMessage.Body.create({
                  text: `> Ada kendala atau punya saran silahkan chat owner`,
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                  text: wm,
                }),
                nativeFlowMessage:
                  proto.Message.InteractiveMessage.NativeFlowMessage.create(
                    {
                      buttons: [
                        {
                          name: "cta_url",
                          buttonParamsJson:
                            '{"display_text":"Owner","url":"https://wa.me/6283867200198","merchant_url":"https://www.google.com"}',
                        },
                      ],
                    }
                  ),
                contextInfo: {
                  mentionedJid: [m.sender],
                  forwardingScore: 155,
                  isForwarded: true,
                  forwardedNewsletterMessageInfo: {
                    newsletterJid: "",
                    newsletterName: wm,
                    serverMessageId: 143,
                  },
                },
              }),
            },
          },
        },
        {}
      );

    await conn.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id,
      })

    conn.menuitsuka[m.sender] = [
    key,
    setTimeout(() => {
      conn.sendMessage(m.chat, { delete: key });
      delete conn.menuitsuka[m.sender];
    }, 5 * 60 * 1000),
  ]
//  } catch (e) {
//    m.reply('An error occurred')
//    throw e
//  }
  }
handler.help = ['menu']
handler.tags = ['main']
handler.command = /^(m|menu|help|\?)$/i
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

async function genProfile(conn, m) {
  let font = await jimp.loadFont('./names.fnt'),
    mask = await jimp.read('https://i.imgur.com/552kzaW.png'),
    welcome = await jimp.read(thumbnailUrl.getRandom()),
    avatar = await jimp.read(await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')),
    status = (await conn.fetchStatus(m.sender).catch(console.log) || {}).status?.slice(0, 30) || 'Not Detected'
    await avatar.resize(460, 460)
    await mask.resize(460, 460)
    await avatar.mask(mask)
    await welcome.resize(welcome.getWidth(), welcome.getHeight())
    await welcome.print(font, 550, 180, 'Name:')
    await welcome.print(font, 650, 255, m.pushName.slice(0, 25))
    await welcome.print(font, 550, 340, 'About:')
    await welcome.print(font, 650, 415, status)
    await welcome.print(font, 550, 500, 'Number:')
    await welcome.print(font, 650, 575, PhoneNumber('+' + m.sender.split('@')[0]).getNumber('international'))
    return await welcome.composite(avatar, 50, 170).getBufferAsync('image/png')
}

function ucapan() {
        const hour_now = moment.tz('Asia/Jakarta').format('HH')
        var ucapanWaktu = 'Ohayou...'
        if (hour_now >= '03' && hour_now <= '10') {
          ucapanWaktu = 'Ohayou...'
        } else if (hour_now >= '10' && hour_now <= '15') {
          ucapanWaktu = 'Konnichiwa...'
        } else if (hour_now >= '15' && hour_now <= '17') {
          ucapanWaktu = 'Konnichiwa...'
        } else if (hour_now >= '17' && hour_now <= '18') {
          ucapanWaktu = 'Konbanwa...'
        } else if (hour_now >= '18' && hour_now <= '23') {
          ucapanWaktu = 'Konbanwa...'
        } else {
          ucapanWaktu = 'Konbanwa'
        }	
        return ucapanWaktu
}