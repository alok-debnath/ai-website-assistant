# AI Website Assistant – Chrome Extension

A modern, production-ready Chrome Extension built with **React + Vite + TypeScript + Tailwind CSS**, integrating **Google Gemini Flash 2.5 API**.

> ✨ Summarize any webpage
> 🗮️ Ask AI questions based on page content
> 🔐 Securely store your Gemini API key locally

---

## ✨ Features

* 🔑 Ask for your **Gemini API key** only once and securely store it using Chrome's `storage.local`
* 📄 **Summarize** the full webpage content with a single click
* ❓ **Ask custom questions** based on the text content of the page
* 🧠 Powered by **Gemini Flash 2.5 (Google)** via `generativelanguage.googleapis.com`
* 💎 **Beautiful UI** using Tailwind CSS
* ⚡️ Fully optimized, lightweight, and production-ready

---

## 🛠️ Tech Stack

* [React](https://react.dev/)
* [Vite](https://vitejs.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* Chrome Extension APIs (Manifest V3)
* Google Gemini API (Flash 2.5)

---

## 📁 Folder Structure

```
your-project/
├── public/
│   ├── icon.png               # Extension icon
│   └──manifest.json           # Chrome extension manifest (MV3)
├── src/
│   ├── popup/                 # React popup components
│   │   ├── Popup.tsx
│   │   ├── ApiKeyPrompt.tsx
│   │   ├── SummarizeTab.tsx
│   │   └── AskTab.tsx
│   └── utils/
│       └── gemini.ts          # Gemini API request handler
├── index.html                 # React entrypoint
├── vite.config.ts             # Vite build config
├── package.json
└── README.md
```

---

## 🚀 Setup & Installation

### 1. **Clone the Repo**

```bash
git clone https://github.com/alok-debnath/ai-website-assistant.git
cd ai-website-assistant
```

### 2. **Install Dependencies**

```bash
npm install
```

### 3. **Build the Extension**

```bash
npm run build
```

> This will generate a `dist/` folder with all required extension files.

### 4. **Load into Chrome**

* Open `chrome://extensions`
* Enable **Developer mode**
* Click **Load unpacked**
* Select the `dist/` folder

---

## 🥪 Usage

1. Click the extension icon → It will prompt for your **Gemini API Key** (stored securely)
2. Use one of the two tabs:

   * **Summarize**: Click to generate a summary of the current page
   * **Ask**: Ask custom questions related to the content of the page
3. Gemini's response will be shown inside the popup in real-time.

---

## 🔐 API Key Security

* Your API key is stored only using `chrome.storage.local`
* Never sent to any third-party server (only directly to Gemini API)

<!-- ---

## 🔮 Future Improvements

* ✅ Dark mode support
* ✅ Save prompt/response history
* ✅ Context menu actions (right-click to summarize)
* ✅ Gemini model switching (Flash / Pro) -->

---

## 📄 License

MIT License © [alok-debnath](https://github.com/alok-debnath). You can find a copy of the license text here: [`LICENSE`](LICENSE).
