import { apivisit } from './kanghit.js'

let handler = async (m, { conn }) => {
let tekss = `*• Thanks To •*
*- Allah SWT*
*- Orang tua*
*- Teman²*
*- Dan yang selalu mendukung*

*• Special Thanks To •*
*- Adiwajshing* _https://github.com/adiwajshing_
*- Norutomo* _https://github.com/Nurutomo_
*- Istikmal* _https://github.com/BochilGaming_
*- Ariffb25* _https://github.com/ariffb25_
*- Aiinne* _https://github.com/Aiinne_
*- Fokus ID* _https://github.com/Fokusdotid_
*- Amirul* _https://github.com/amiruldev20_
*- Xiao/Elaina* _https://github.com/ImYanXiao_
*- Hyzer* _https://github.com/Hyzerr_
*- Aldi* _https://github.com/Hyuura-Official_
*- Ilman* _https://github.com/ilmanhdyt_
*- Rasel* _https://github.com/raselcomel_
*- Fatur* _https://github.com/Ftwrr_
*- Rominaru* _https://github.com/Rominaru_
*- Kannachann* _https://github.com/Kannachann_
*- The.sad.boy01* _https://github.com/kangsad01_
*- Ameliascrf* _https://github.com/Ameliascrf_
*- Johannes* _https://github.com/Johannes2803_
*- BrunoSobrino* _https://github.com/BrunoSobrino_
*- Krisna* _https://github.com/NevtBotz_
*- LitRHap* _https://github.com/LitRHap_
*- Rlxfly* _https://github.com/Rlxfly_
*- Fahri* _https://github.com/FahriAdison_
*- Rio* _https://github.com/PixieID_

Terimakasih atas kalian jika tidak ada kalian maka bot ini tidak akan berkembang....`
await m.reply(tekss)
await apivisit
}
handler.help = ['thanksto']
handler.tags = ['info']
handler.command = /^(ttq|thanksto)$/i
export default handler
