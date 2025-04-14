📦 Сборка расширения Gemini Sourcing Analyzer
🔧 Установка зависимостей
Убедитесь, что у вас установлен Node.js. Затем установите зависимости:

bash

npm install
🛠️ Конфигурация Webpack
Для сборки TypeScript-кода расширения в JavaScript используется webpack.config.js. Основные параметры конфигурации:

js

entry: './src/extension.ts',
output: {
  path: path.resolve(__dirname, 'dist'),
  filename: 'extension.js',
  libraryTarget: 'commonjs2',
},
Это указывает Webpack, что входной файл находится в src/extension.ts, а выходной — dist/extension.js, который будет использоваться VS Code.

🧪 Сборка проекта
Выполните команду для сборки расширения:

bash

npx webpack --config webpack.config.js
После выполнения в директории dist появятся файлы extension.js и extension.js.map.

📁 Структура проекта
bash

GEMINI-SOURCING-ANALYZER/
├── dist/
│   └── extension.js         # Скомпилированный файл расширения
├── lib/
│   └── gemini.ts            # Логика общения с API Gemini
├── src/
│   └── extension.ts         # Основной entry point расширения
├── webpack.config.js        # Конфигурация Webpack
├── tsconfig.json            # TypeScript конфигурация
├── package.json             # Скрипты и зависимости
🚀 Запуск в режиме отладки
После сборки можно запустить расширение в VS Code:

Откройте проект в VS Code.

Нажмите F5 для запуска "Extension Development Host".

Откройте командную палитру Ctrl+Shift+P и выполните:

makefile

Gemini: Анализ стаффинг сообщения


