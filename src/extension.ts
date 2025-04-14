import * as vscode from 'vscode';
import { GeminiAPI } from './lib/gemini';

async function sendPromptWithContinuation(prompt: string, apiKey: string): Promise<string> {
  let fullResponse = '';
  let nextPrompt = prompt;
  let safety = 0;

  while (safety++ < 5) {
    const chunk = await GeminiAPI.sendPrompt(nextPrompt, apiKey);
    fullResponse += chunk;

    if (chunk.length < 1000 || /(?:[.!?])\s*$/.test(chunk)) break;
    nextPrompt = `Продолжи с того места, где остановился:\n\n${chunk}`;
  }

  return fullResponse;
}

export async function activate(context: vscode.ExtensionContext) {
  const commandId = 'geminiSourcingAnalyzer.runAnalysis';

  const config = vscode.workspace.getConfiguration('geminiSourcingAnalyzer');
  const apiKey = config.get<string>('apiKey');

  if (!apiKey || apiKey.length < 10) {
    vscode.window.showWarningMessage('⚠️ Gemini API Key не найден в настройках. Добавьте "geminiSourcingAnalyzer.apiKey" в settings.json.');
  } else {
    console.log('[Gemini Sourcing Analyzer] API ключ успешно загружен.');
  }

  const disposable = vscode.commands.registerCommand(commandId, async () => {
    const input = await vscode.window.showInputBox({
      prompt: 'Вставь сообщение из канала стаффинга (включая требования и описание)',
      placeHolder: 'Полный блок текста из запроса',
    });

    if (!input) {
      vscode.window.showWarningMessage('Сообщение не было введено.');
      return;
    }

    vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: '🧠 Анализ запроса и компании...',
      cancellable: false,
    }, async () => {
      try {
        // Шаг 1 — нормализация данных
        const normalizationPrompt = `Проанализируй этот стаффинг-запрос и вытащи:
1. Название компании
2. Название роли
3. Требуемый стек
4. Длительность проекта
5. Примерный размер команды (если указан или предполагается)
6. Минимальный английский
7. Релевантная информация из запроса, которая не вошла в другие рубрики

Формат: Markdown с заголовками

Исходный текст:
${input}`;

        console.log('[Gemini Analyzer] ⏳ Отправка на нормализацию...');
        const normalized = await sendPromptWithContinuation(normalizationPrompt, apiKey ?? '');
        console.log('[Gemini Analyzer] ✅ Нормализация завершена:', normalized);

        // Пытаемся вытащить название компании из ответа
        let company = 'unknown';

        const companyPattern = /^###\s*\d+\.\s*Название компании\s*\n(.+)/im;
        const matchCompany = normalized.match(companyPattern);
        if (matchCompany?.[1]) {
          company = matchCompany[1].trim();
          console.log('[Gemini Analyzer] 📦 Компания извлечена из нормализации:', company);
        } else {
          console.warn('[Gemini Analyzer] ⚠️ Не удалось извлечь компанию из нормализованного текста');
        }

        // Шаг 2 — OSINT-анализ
        const osintPrompt = `Ты — AI-аналитик. На входе тебе даётся название компании, стек проекта и результат первичного анализа в формате Markdown.
Сформируй:

1. Что делает эта компания (сайт, сфера, клиенты, продукты)
2. Тип (стартап / корпорация / R&D центр)
3. Интересные факты (AI, инвестиции, найм)
4. Насколько она привлекательна для QA Automation Engineer по стеку из проекта (оценка от 1 до 5)
5. Какой портрет специалиста QA больше всего подойдёт для работы в такой компании по стеку из проекта: какие софт-скиллы и хард-скиллы у него должны быть, какие задачи он должен уметь решать, какие проекты/технологии для него привычны

Компания: ${company}

Первичный анализ:
${normalized}`;

        console.log('[Gemini Analyzer] ⏳ Отправка на OSINT-анализ...');
        const osint = await sendPromptWithContinuation(osintPrompt, apiKey ?? '');

        const doc = await vscode.workspace.openTextDocument({
          content: `🧾 **Результат анализа**

## 📌 Нормализация
${normalized}

---

## 🌐 OSINT по компании ${company}
${osint}`,
          language: 'markdown',
        });
        vscode.window.showTextDocument(doc);
      } catch (err) {
        console.error('[Gemini Analyzer] ❌ Ошибка:', err);
        vscode.window.showErrorMessage('Ошибка при вызове Gemini: ' + (err as Error).message);
      }
    });
  });

  context.subscriptions.push(disposable);
  vscode.window.showInformationMessage('Gemini Sourcing Analyzer активирован.');
}

export function deactivate() { }
