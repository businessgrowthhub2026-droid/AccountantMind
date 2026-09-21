\# AccountWise — Notes → Accounting Tutor



AccountWise is a local AI accounting tutor that helps students understand their own accounting notes.



The app uses the QVAC SDK to run AI inference locally on the user's computer.



\## Features



\- Paste accounting notes into the app

\- Ask questions about your notes

\- Receive explanations from a local AI tutor

\- No cloud AI API is required for inference

\- Simple browser-based interface



\## How It Works



1\. The student pastes accounting notes.

2\. The student asks an accounting question.

3\. The notes and question are sent to the local Node.js server.

4\. QVAC runs the language model locally.

5\. The answer is returned to the browser.



\## Tech Stack



\- Node.js

\- JavaScript

\- HTML/CSS

\- QVAC SDK

\- Local LLM inference



\## QVAC SDK



This project uses:



`@qvac/sdk` version `0.19.1`



The QVAC model is loaded with `loadModel()` and generates answers using `completion()`.



\## Installation



Clone the repository:



```bash

git clone https://github.com/businessgrowthhub2026-droid/AccountWise.git

cd AccountWise

