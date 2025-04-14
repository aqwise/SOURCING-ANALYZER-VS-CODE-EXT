import axios from 'axios';

export class GeminiAPI {
  static async sendPrompt(prompt: string, apiKey: string): Promise<string> {
    if (!apiKey || apiKey.length < 10) return '[❌ Нет API ключа Gemini]';

    const body = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        topK: 1,
        topP: 1,
        maxOutputTokens: 1024,
      }
    };

    try {
      console.log('[Gemini API] body:', JSON.stringify(body));
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        body,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '[❌ Пустой ответ от Gemini]';
    } catch (error: any) {
      console.error('[Gemini API] ❌ Ошибка:', error);
      return '[❌ Ошибка при вызове Gemini]';
    }
  }
}
