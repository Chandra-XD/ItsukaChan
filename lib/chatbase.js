import axios from 'axios';

class ChatBase {
  static url = "https://www.chatbase.co";
  static supports_gpt_35_turbo = true;
  static supports_gpt_4 = true;
  static working = true;

  static async *createAsyncGenerator(model, messages, kwargs) {
    let chat_id = "";

    if (model === "gpt-4") {
      chat_id = "quran---tafseer-saadi-pdf-wbgknt7zn";
    } else if (model === "gpt-3.5-turbo" || !model) {
      chat_id = "chatbase--1--pdf-p680fxvnm";
    } else {
      throw new Error(`Model are not supported: ${model}`);
    }

    const headers = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
      "Accept": "*/*",
      "Accept-language": "en,fr-FR;q=0.9,fr;q=0.8,es-ES;q=0.7,es;q=0.6,en-US;q=0.5,am;q=0.4,de;q=0.3",
      "Origin": this.url,
      "Referer": this.url + "/",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
    };

    const data = {
      "messages": messages,
      "captchaCode": "hadsa",
      "chatId": chat_id,
      "conversationId": `kcXpqEnqUie3dnJlsRi_O-${chat_id}`
    };

    try {
      const response = await axios.post(`${this.url}/api/fe/chat`, data, { headers: headers });

      if (response.status !== 200) {
        throw new Error(`ChatBase request failed with status code: ${response.status}`);
      }

      const stream = response.data;
      yield stream;
    } catch (error) {
      console.error('Error:', error);
      throw error; // Rethrow the error for handling elsewhere, if needed.
    }
  }

}

export default ChatBase;
