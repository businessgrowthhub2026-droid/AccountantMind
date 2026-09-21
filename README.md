# AccountWise — Notes → Accounting Tutor

AccountWise is a local AI accounting tutor that helps students understand their own accounting notes.

The app uses the **QVAC SDK** to run AI inference directly on the user's computer. No cloud AI API key is required for the tutoring inference.

## 🔗 Project Links

- **GitHub Repository:** https://github.com/businessgrowthhub2026-droid/AccountWise
- **App URL:** http://localhost:3000
- **QVAC:** https://qvac.tether.io/

> The app currently runs locally because QVAC performs AI inference on the user's device.

## ✨ What the App Does

AccountWise turns a student's accounting notes into an interactive local AI tutor.

A student can:

- Paste their accounting notes
- Save the notes inside the app
- Ask questions about the notes
- Receive an AI-generated accounting explanation
- Clear the current notes and conversation
- Use the tutor without a cloud AI API key

## 🤖 QVAC Integration

AccountWise uses:

- `loadModel()` to load the local QVAC language model
- `completion()` to generate the accounting tutor response

The QVAC SDK version used in this project is:

`@qvac/sdk 0.19.1`

The QVAC model is downloaded the first time the application runs and then used locally for inference.

## 🔒 On-Device AI

The accounting question and notes are processed by the local QVAC model running on the user's computer.

The application does not require:

- OpenAI API keys
- Cloud AI APIs
- A paid AI service
- A usage-based AI subscription

The AI inference happens locally through QVAC.

## 🛠️ Tech Stack

- Node.js
- JavaScript
- HTML
- CSS
- QVAC SDK
- Local LLM inference

## 📋 Requirements

- Node.js
- npm
- A computer capable of running the QVAC model

## 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/businessgrowthhub2026-droid/AccountWise.git
cd AccountWise