import fetch from "node-fetch"

let handler = async (m, {
    conn,
    usedPrefix,
    command,
    args
}) => {
    let query = "Input Code:\n.carbon console.log('hello world ')"
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw query
    CarbonifyV1(text)
  .then((result) => {
    return conn.sendFile(m.chat, result, "", "*V1 by:*\n" + m.name, m);
  })
  .catch(() => {
    return CarbonifyV2(text)
      .then((result) => {
        return conn.sendFile(m.chat, result, "", "*V2 by:*\n" + m.name, m);
      })
      .catch((error) => {
        throw error;
      });
  });
    
}
handler.help = ["carbon"]
handler.tags = ["misc"]
handler.command = /^carbon(ify)?$/i
export default handler

async function CarbonifyV1(input) {
    let Blobs = await fetch("https://carbonara.solopov.dev/api/cook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "code": input
            })
        })
        .then(response => response.blob())
    let arrayBuffer = await Blobs.arrayBuffer();
    let buffer = Buffer.from(arrayBuffer);
    return buffer
}

async function CarbonifyV2(input) {
    let Blobs = await fetch("https://carbon-api.vercel.app/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "code": input
            })
        })
        .then(response => response.blob())
    let arrayBuffer = await Blobs.arrayBuffer();
    let buffer = Buffer.from(arrayBuffer);
    return buffer
}