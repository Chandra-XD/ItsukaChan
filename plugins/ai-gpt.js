import cheerio from 'cheerio';
import fetch from 'node-fetch';
import axios from "axios";

let handler = async (m, { conn, text }) => {
if (!text) return m.reply("Input Query")
try {
let api = await gptlogic(text)
conn.reply(m.chat, api, m)
    
} catch {
let messages = [
    // { role: 'system', content: `Namamu adalah ${conn.user.name || ''}, jawablah semua pertanyaan menggunakan bahasa gaul` },
    { role: 'user', content: text }
  ]
  let req = await axios.post('https://skizo.tech/api/openai?apikey=Chandra-pecinta-milf', { messages }).catch(e => e.response)
  if (req.status !== 200) throw req.data || req.statusText

  let { result, code } = req.data
  await m.reply(result)
//  if (code.trim() !== 'no code') await m.reply(code)
}
}
handler.help = ["ai"]
handler.tags = ["ai"]
handler.command = /^(ai)$/i
export default handler

async function gptlogic(text) {
    try {
        const response = await axios.post('https://ragbot-starter.vercel.app/api/chat', {
            messages: [
                {
                    role: 'assistant',
                    content: 'Kamu berperan sebagai Ai serbaguna, gunakanlah bahasa Indonesia'
                },
                {
                    role: 'user',
                    content: text
                }
            ],
            useRag: true,
            llm: 'gpt-4o',
            similarityMetric: 'cosine'
        });

        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

async function chatgpt(messages, prompt = "Be a helpful assistant") {
  try {
    return await new Promise((resolve, reject) => {
      if(!messages) return reject("failed reading undefined messages!");
      if(!Array.isArray(messages)) return reject("invalid array messages input");
      axios.post("https://chatbot-ji1z.onrender.com/chatbot-ji1z", {
        messages: [
          ...((messages[0].role === "system") ? [] : [{
            role: "system",
            content: prompt
          }]), ...messages
        ]
      }).then(res => {
        if(!res.data?.choices[0].message) return reject("failed to get ai response!");
        return resolve({
          success: true,
          answer: res.data.choices[0].message.content
        })
      })
    })
  } catch (e) {
    return {
      success: false,
      errors: [e]
    }
  }
}