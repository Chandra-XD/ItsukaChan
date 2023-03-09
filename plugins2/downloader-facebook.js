import fetch from 'node-fetch'
import { apivisit } from './kanghit.js'

let handler = async (m, { conn, args, command, usedPrefix }) => {
if (!args[0]) return m.reply('Putting *URL* Facebook..')
if (!args[0].match(/www.facebook.com|fb.watch/g)) throw `Invalid *URL*`
let sections = [{
title: ``,
rows: [
{title: "Facebook Downloader V1", rowId: `${usedPrefix}fb1 ${args[0]}`},
{title: "Facebook Downloader V2", rowId: `${usedPrefix}fb2 ${args[0]}`},
{title: "Facebook Downloader V3", rowId: `${usedPrefix}fb3 ${args[0]}`}
]}]
let listMessage = {
text: `Please select the Facebook download server below to continue`,
footer: ``,
title: ``,
buttonText: `Click Here!!`,
sections }  
try {
switch (command) { 
case "facebook": case "fb": {
await conn.sendMessage(m.chat, listMessage, { quoted: m }) 
await apivisit }
break
case "facebook2": case "fb2": {
let vio = await fetch(`https://api.violetics.pw/api/downloader/facebook?apikey=beta&url=` + args[0])
let vioo = await vio.json()
let videovio = `${vioo.result.hd.url || vioo.result.sd.url}`
await m.reply('Sedang diproses...')
await conn.sendFile(m.chat, videovio, `fb2.mp4`, wm, m) 
await apivisit }
break
case "facebook3": case "fb3": {
let lol = await fetch(`https://api.lolhuman.xyz/api/facebook?apikey=Danwfrostkey&url=` + args[0])
let tolol = await lol.json()
let url = tolol.result
await m.reply('Sedang diproses...')
await conn.sendFile(m.chat, url, `fb3.mp4`, wm, m) 
await apivisit }
break
}} catch {
await m.reply('Error 404 Not Found')
await apivisit
}}
handler.help = ['facebook'].map(v => v + ' <option>')
handler.tags = ['downloader']
handler.command = /^(facebook|fb||facebook2|fb2|facebook3|fb3)$/i
export default handler