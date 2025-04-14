# 🧠 Gemini Sourcing Analyzer — VS Code Extension

Инструмент для анализа стаффинг-запросов и OSINT по IT-компаниям. Использует Google Gemini API для генерации структурированной аналитики.

---

## 🚀 Быстрый старт

### 📦 Установка зависимостей
```bash
npm install
```

### ⚙️ Сборка через Webpack
```bash
npx webpack --config webpack.config.js
```

После сборки файл `dist/extension.js` будет готов к запуску в дебаг-режиме VS Code.

---

## ⚙️ Конфигурация VS Code `settings.json`

Откройте командную палитру → `Preferences: Open Settings (JSON)` и добавьте:

```json
{
  "redhat.telemetry.enabled": true,
  "geminiSourcingAnalyzer.apiKey": "AIzaSyBV3iKFg", // 🔑 Ваш ключ Gemini API
  "editor.accessibilitySupport": "on"
}
```

> `geminiSourcingAnalyzer.apiKey` необходим для выполнения запросов к Gemini API.

---

## 🛠 Структура проекта

```bash
├── dist/                  # Сборка Webpack
├── src/                  # Исходники
│   └── extension.ts      # Точка входа расширения
├── lib/                  # Gemini API helper
│   └── gemini.ts
├── webpack.config.js     # Webpack-конфиг
├── package.json          # Зависимости и команды
└── tsconfig.json         # TypeScript-конфигурация
```

---

## 📋 Возможности

- 📌 Нормализация входного текста (извлечение компании, роли, стека и т.д.)
- 🌐 OSINT-анализ компании по открытым источникам
- 🧾 Вывод Markdown-документа с результатами
- ⏩ Автоматическое продолжение длинных ответов Gemini при необходимости

---

## 📎 Пример использования

1. Запустить расширение в VS Code (`Run Extension`)
2. Выполнить команду `Gemini: Анализ стаффинг сообщения`
3. Вставить полный текст из канала стаффинга
4. Получить результат в виде Markdown-документа

---

⚙️ Настройка расширения Gemini Sourcing Analyzer
📘 Конфигурация settings.json в VS Code
Для корректной работы расширения необходимо указать API-ключ Gemini:

Шаги:
Откройте VS Code

Перейдите в настройки: Ctrl + Shift + P → Preferences: Open Settings (JSON)

Добавьте следующую конфигурацию:

json

{
  "redhat.telemetry.enabled": true,
  "geminiSourcingAnalyzer.apiKey": "AIzaSyBV3iKFg", // 🔑 ваш реальный ключ Gemini API
  "editor.accessibilitySupport": "on"
}
💡 Параметр geminiSourcingAnalyzer.apiKey будет использоваться для вызова Gemini API через axios.

📦 Сборка и публикация Gemini Sourcing Analyzer
🔧 Установка зависимостей
bash

npm install
🛠️ Сборка с Webpack
bash

npx webpack --config webpack.config.js
После этого скомпилированный extension.js будет доступен в директории dist.

📁 Структура проекта
pgsql

GEMINI-SOURCING-ANALYZER/
├── dist/
│   └── extension.js
├── lib/
│   └── gemini.ts
├── src/
│   └── extension.ts
├── webpack.config.js
├── tsconfig.json
├── package.json
🚀 Запуск в режиме отладки
Выполните:

F5 в VS Code

В открывшемся окне “Extension Development Host” используйте команду:

makefile

Gemini: Анализ стаффинг сообщения
📤 Публикация в VS Code Marketplace
1. Установка vsce — VS Code Extension CLI:
bash

npm install -g @vscode/vsce
2. Создание личного access token на https://dev.azure.com
Тип: All accessible organizations

Scopes: Marketplace > Manage

Сохраните токен.

3. Выпуск .vsix файла:
bash

vsce package
Появится файл gemini-sourcing-analyzer-0.0.1.vsix.

4. Публикация:
bash

vsce publish --pat <ВАШ_ТОКЕН>
📌 Важно: перед публикацией убедитесь, что:

В package.json указано уникальное имя и publisher

Создан publisher в Visual Studio Marketplace

## 📄 Лицензия
MIT
