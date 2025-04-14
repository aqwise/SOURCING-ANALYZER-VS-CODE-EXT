# 🌠 Gemini Sourcing Analyzer — VS Code Extension

🔗 Инструмент для анализа стаффинг-запросов и OSINT по IT-компаниям. Использует Google Gemini API для генерации структурированной аналитики.

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

## ⚙️ Конфигурация VS Code (`settings.json`)

Откройте командную палитру → `Preferences: Open Settings (JSON)` и добавьте:

```json
{
  "redhat.telemetry.enabled": true,
  "geminiSourcingAnalyzer.apiKey": "AIzaSyBV3iKFg", // 🔑 Ваш ключ Gemini API
  "editor.accessibilitySupport": "on"
}
```

> 💡 Параметр `geminiSourcingAnalyzer.apiKey` используется для вызова Gemini API через axios.

---

## 📁 Структура проекта

```
GEMINI-SOURCING-ANALYZER/
├── dist/
│   └── extension.js               # Скомпилированный файл расширения
├── lib/
│   └── gemini.ts                  # Работа с Gemini API
├── src/
│   └── extension.ts              # Точка входа VS Code Extension
├── webpack.config.js             # Webpack-конфигурация
├── tsconfig.json                 # TypeScript-настройки
├── package.json                  # Скрипты и зависимости
```

---

## 📋 Возможности

- 📌 Нормализация входного текста (извлечение компании, роли, стека и т.д.)
- 🌐 OSINT-анализ компании по открытым источникам
- 🗞️ Вывод Markdown-документа с результатами
- ⏩ Автоматическое продолжение длинных ответов Gemini при необходимости

---

## 🧪 Пример использования

1. Запустить расширение в VS Code (`Run Extension`)
2. Выполнить команду `Gemini: Анализ стаффинг сообщения`
3. Вставить текст из канала стаффинга
4. Получить структурированный анализ в новом окне

---

## ⚒️ Разработка и отладка

### ▶️ Запуск в режиме отладки

1. Откройте проект в VS Code
2. Нажмите `F5` (запуск в "Extension Development Host")
3. Выполните команду `Gemini: Анализ стаффинг сообщения`

---

## 🚒 Публикация в VS Code Marketplace

### 1. Установка CLI
```bash
npm install -g @vscode/vsce
```

### 2. Создание токена
- Перейдите на [Azure DevOps](https://dev.azure.com)
- Создайте **Personal Access Token**
- Разрешения: `Marketplace > Manage`

### 3. Сборка `.vsix`
```bash
vsce package
```
Создаст файл вида: `gemini-sourcing-analyzer-0.0.1.vsix`

### 4. Публикация
```bash
vsce publish --pat <ВАШ_ТОКЕН>
```

> Убедитесь, что в `package.json` указан правильный `name` и `publisher`, а также что вы зарегистрированы как publisher в Marketplace.

---

## 📄 Лицензия
MIT