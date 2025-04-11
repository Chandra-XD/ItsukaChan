import axios from "axios"
import qs from "qs"

let handler = async (m, {
    conn,
    args
}) => {
    let query = "Input Code:\n.pastebin console.log('hello world ')"
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw query
    
    try {
    var data = qs.stringify({
      api_option: "paste",
      api_paste_code: text,
      api_paste_private: "1",
      api_user_key: "",
      api_paste_name: "Chandra XD | ItsukaChan",
      api_paste_expire_date: "10M",
      api_paste_format: "text",
      api_dev_key: "c3vmFYcnIqCyBj0LXdoW8Lf20D_7jcKj",
    });
    var config = {
      method: "POST",
      url: "https://pastebin.com/api/api_post.php",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    const response = await axios(config).catch(function (error) {
      throw new Error(error.response.data);
    });
    const raw = response.data.replace('https://pastebin.com', 'https://pastebin.com/raw')
    m.reply(`*Link :* ${response.data}\n*Raw :* ${raw}`)
    } catch (e) {
    m.reply(e)
    }
}
handler.help = ["pastebin"]
handler.tags = ["misc"]
handler.command = /^paste(bin)?$/i
export default handler