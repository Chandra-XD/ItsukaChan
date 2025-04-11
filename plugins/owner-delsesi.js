import {
  readdirSync,
  unlinkSync
} from 'fs'

let handler = async ( m ) => {
    const del = await delsesi();
    m.reply("Done bang")
}

handler.help = ["delsesi"]
handler.tags = ["owner"]
handler.command = /^(delsesi)$/i
handler.owner = true
export default handler

function delsesi() {
    let prekey = [];
    const directorio = readdirSync('./session');
    const filesFolderPreKeys = directorio.filter((file) => {
        return file.startsWith('pre-key-');
    });
    const filesFolderSession = directorio.filter((file) => {
        return file.startsWith('session-');
    });
    const filesFolderSesiSW = directorio.filter((file) => {
        return file.startsWith('sender-key-');
    });
    prekey = [...prekey, ...filesFolderPreKeys, ...filesFolderSession, ...filesFolderSesiSW];
    filesFolderPreKeys.forEach((files) => {
        unlinkSync(`./session/${files}`);
    });
    filesFolderSession.forEach((filess) => {
        unlinkSync(`./session/${filess}`);
    });
    filesFolderSesiSW.forEach((fileSW) => {
        unlinkSync(`./session/${fileSW}`);
    });
}