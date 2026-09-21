# AccountWise — Local AI Accounting Tutor

AccountWise is a local AI accounting tutor that helps students understand accounting notes and ask questions about accounting concepts.

The app uses the **Tether QVAC SDK** to run AI inference locally on the user's computer. No cloud AI API key is required for the tutoring inference.

## 🚀 Project Links

* **GitHub Repository:** https://github.com/businessgrowthhub2026-droid/AccountWise
* **Local App:** http://localhost:3000
* **QVAC:** https://qvac.tether.io/

> The local app URL works when AccountWise is running on your computer.

## 📚 What the App Does

AccountWise lets a student:

* Paste accounting notes
* Save notes inside the app
* Ask accounting questions
* Receive AI-generated accounting explanations
* Clear notes and conversation
* Use the tutor with local AI inference

## 🧠 QVAC Integration

AccountWise uses the **Tether QVAC SDK**:

* `loadModel()` — loads the local QVAC language model
* `completion()` — generates the accounting tutor response

**QVAC SDK version:** `@qvac/sdk 0.19.1`

## 🛠️ Built With

* JavaScript
* HTML
* Node.js
* Tether QVAC SDK

## ▶️ Run Locally

Clone the repository:

```bash
git clone https://github.com/businessgrowthhub2026-droid/AccountWise.git
cd AccountWise
```

Install dependencies:

```bash
npm install
```

Start the application:

```bash
node server.js
```

Then open:

**http://localhost:3000**

## 🔒 Local AI

AccountWise is designed to run its tutoring inference locally using QVAC. This allows the AI functionality to run on the user's computer without requiring a cloud AI API key.

## 📄 License

This project is licensed under the **MIT License**.
